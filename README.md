# bun-prompt

A script that generates the full prompt. It can be setup by configuring the $PROMPT
environment variable like this:

```bash
PROMPT='$(HOST=$HOST bun run /PATH/TO/index.ts)'
```

The prompt settings can be configured by editing file `settings.ts`.
