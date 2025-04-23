## Instructions: IMPORTANT
- Do not use NBSP
- Do not make needless changes to the file. Keep a clean diff.
- Include file name and path at the top of the file
- Output code in chat. Do not use the code editor feature. It is buggy.

## Process
- Build reusable components and libraries. Don't put image processing code in the tests, move it to a library. Then call that code from your test.
- Expand existing libraries and tests, before creating new ones.
- If you want a reminder about what files already exist or what they contain, ASK.
- Prefer TDD over guess & check
- Take one guess how to fix a problem. If that does not work, write a test.
- TDD means red-green-refactor. Write a test that fails, then fix the SUT to make it pass.
- Use logging for debugging. I.e. logger.debug("message")
- Output visual artifacts where appropriate. I.e. if we generate a test image, show it or save to disk. Don't just test its properties and allow it to expire in memory.
- Unless code changes are small (1-2 lines), output the entire file. If outputting just the changed lines, be very clear about where the change is.
- Do not include instructions about how to execute the code unless relevant and non-obvious.

## Validate
- Once you've read and understood the above, validate your understanding by outputting a concise summary of the instructions. Include double green checkmarks ✅✅ to indicate you understand.