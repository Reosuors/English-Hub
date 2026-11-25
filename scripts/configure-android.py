"""Configure Android signing and versionCode/versionName for Capacitor builds (run in CI after cap sync)."""
from pathlib import Path
import os
import re

root = Path(__file__).resolve().parents[1]
app_gradle = root / "android/app/build.gradle"
variables = root / "android/variables.gradle"

if variables.exists():
    v = variables.read_text()
    for key in ("compileSdkVersion", "targetSdkVersion"):
        m = re.search(key + r"\s*=\s*(\d+)", v)
        if m and int(m.group(1)) < 35:
            v = v.replace(m.group(0), f"{key} = 35")
    variables.write_text(v)
    print([l.strip() for l in v.splitlines() if "Sdk" in l])

g = app_gradle.read_text()
if "ENGLISH_HUB_SIGNING" not in g:
    g += """

// ENGLISH_HUB_SIGNING: release signing + version (from GitHub secrets or CI ephemeral keystore)
android {
    defaultConfig {
        versionCode = Integer.parseInt(System.getenv("VERSION_CODE") ?: "1")
        versionName = System.getenv("VERSION_NAME") ?: "1.0.0"
    }
    signingConfigs {
        release {
            if (System.getenv("KEYSTORE_FILE")) {
                storeFile = file(System.getenv("KEYSTORE_FILE"))
                storePassword = System.getenv("KEYSTORE_PASSWORD")
                keyAlias = System.getenv("KEY_ALIAS")
                keyPassword = System.getenv("KEY_PASSWORD")
            }
        }
    }
    buildTypes {
        release {
            if (System.getenv("KEYSTORE_FILE")) {
                signingConfig = signingConfigs.release
            }
        }
    }
}
"""
    app_gradle.write_text(g)
print("Android signing configured; keystore present:", bool(os.environ.get("KEYSTORE_FILE")))
