use zed_extension_api as zed;

struct WispExtension;

impl zed::Extension for WispExtension {
    fn new() -> Self {
        Self
    }
}

zed::register_extension!(WispExtension);
