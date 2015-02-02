# colored-terminal


## Install
    npm install -g thegregorator/colored-terminal


## Usage

### Configuration
The configuration file is an array of rule dictionaries, which each consist
of a path matcher and a set of colors.

Rules are processed from first to last, so rules further down can override
earlier rules.

Path matchers can be defined using:
* `path` - Matches a directory and its subdirectories.
* `singlePath` - Matches a single directory.
* `pathRegex` - Matches a directory with a regular expression. Can be of the format `"expr"` or `"/expr/flags"`.

Colors can be defined using a dictionary with `fg`/`bg` entries for foreground/background colors.  
Non-dictionary colors are treated as background colors (`x` is equivalent to `{"bg": x}`).

Color values can be specified using formats supported by CSS:
* `"#438"`
* `"#483D8B"`
* `"rgb(72, 61, 139)"`
* `"rgba(72, 61, 139, 1)"` (transparent `fg` colors will be blended with the `bg`)
* `"darkslateblue"`

See the [example configuration file](example/colored-terminal.json).

### Command-line interface
    $ colored-terminal --help
    
    Directory->color mapping with support for iTerm's color escape codes
    Usage: colored-terminal [OPTION]
      -c, --config    configuration file (default: ~/.config/colored-terminal.json)
      -p, --path      path to test against the configuration (default: CWD)
      -m, --mode      print mode (iterm-escaped, hex, rgb, source, none)
                      defaults to "none", or "iterm-escaped" when iTerm is detected
      -h, --help      display this help and exit

The `-c` option lets you specify a configuration file other than the one at the default path.

You can specify specific paths other than the current directory via tha `-p` option to test your configuration.

Also useful for debugging is the `-m source` option, which prints the matching color(s) as specified in the configuration, as well as which rule they came from.


## Get started in your terminal

The best kind of color-changing terminal is one that does it automatically.

First, save the [example configuration file](example/colored-terminal.json) to the default path (`~/.config/colored-terminal.json`).

Then, paste this bad boy into your `.bash_profile` or `.zshrc` or whatever, and you'll be good to go:
```bash
_colored_terminal() {
    # Run the command asynchronously so it doesn't delay the prompt,
    # and in a subshell so it won't ouput async job info.
    (colored-terminal &)
    # Or, for a custom config file path:
    # (colored-terminal -m path/to/config_file.json &)
}
# Set up colored-terminal to run before each prompt, so you'll always have
# the right color displayed.
if [[ -n "$ZSH_VERSION" ]]; then
    # zsh
    typeset -a precmd_functions
    precmd_functions+=_colored_terminal
else 
    # bash
    export PROMPT_COMMAND='_colored_terminal;'$PROMPT_COMMAND
fi
```