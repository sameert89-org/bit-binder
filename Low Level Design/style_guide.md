# Writing and Formatting Guide

This guide defines the writing and Markdown conventions for the authored Low Level Design notes. It does not apply to generated files in `Excalidraw/` or files in `copilot/`.

## General Principles

- Prefer clear, direct sentences over dense or formal wording.
- Preserve useful humor, memorable examples, and emojis.
- Explain the idea before presenting a detailed example.
- Keep paragraphs focused on one idea.
- Correct grammar and spelling without changing the intended meaning.
- Do not add a `#` title. Obsidian derives the page title from the filename.

## Headings

Use headings to divide a note into meaningful sections, not merely to emphasize a sentence.

- Use `##` for major sections or questions.
- Use `###` for examples or subsections within a major section.
- Do not skip heading levels.
- Use sentence case for headings.
- Keep headings concise.

```markdown
## Why do I need a proxy?

### Example: VPNs
```

Short notes do not need headings.

## Bold

Use **bold** for the central takeaway, a critical distinction, or a term being defined in a table or list.

```markdown
**Clients should not be forced to depend on methods they do not use.**
```

Do not bold:

- Every occurrence of an important term
- Entire paragraphs
- Technical identifiers that should use inline code
- Text solely to make it look like a heading

## Italics

Use *italics* sparingly for natural-language emphasis or when introducing a term in prose.

```markdown
This creates *tight coupling* between the classes.
```

Do not italicize class names, method names, filenames, commands, language keywords, or other literal identifiers. Use inline code for those.

## Inline Code

Use single backticks for short literal or technical identifiers within prose:

- Class, interface, method, function, and variable names
- Language keywords and types
- Commands, filenames, protocols, and APIs
- Short expressions or one-line code examples

```markdown
The `StreamReader` class composes a `Stream`.
Use `ref` to pass a value type by reference.
```

Do not use inline code for broad concepts such as abstraction, inheritance, proxy, or dependency injection unless referring to a literal identifier with that name.

## Fenced Code Blocks

Use triple-backtick fenced blocks for multi-line code, structured examples, or snippets that need syntax highlighting. Always specify the language when known.

````markdown
```csharp
public interface IPaymentGateway
{
    void ProcessPayment(decimal amount);
}
```
````

Keep a blank line before and after each fenced block. Use inline code instead when the complete example fits naturally within a sentence or table cell.

## Definitions and Callouts

Use a plain blockquote for a concise opening definition that frames the whole note.

```markdown
> A proxy controls access to another object while preserving its interface.
```

Use Obsidian callouts for supplementary information, warnings, or questions. Give each callout a short, descriptive title.

```markdown
> [!NOTE] Flyweights and thread safety
> Treat flyweight objects as immutable so they can be shared safely.
```

Do not use blockquotes for ordinary explanatory paragraphs.

## Lists

- Use bullets when order does not matter.
- Use numbered lists when order, ranking, or sequence matters.
- Write list items in parallel grammatical form.
- Use a colon before a list introduced by a complete sentence.
- Do not bold every list item. Bold only a leading label when it improves scanning.

```markdown
- **Client:** The object requesting access
- **Proxy:** The object controlling access
- **Real subject:** The object receiving the forwarded request
```

## Tables

Use tables for compact comparisons or structured reference material. Keep cell contents concise. Use bold for row or column labels only when it improves scanning, and use inline code for identifiers or code snippets.

## Links and Embeds

Keep Obsidian wikilinks and embeds for internal content:

```markdown
See [[Types of Polymorphism]].
![[Bridge 2026-05-06 23.13.58.excalidraw]]
```

- Use descriptive text for external Markdown links.
- Integrate links into a sentence when possible.
- Avoid bare URLs.
- Use embeds only when the embedded note or image directly supports the surrounding section.

## Technical Writing Conventions

- Use the official capitalization of technologies and concepts, such as C#, JavaScript, .NET, HTTP, and SOLID.
- Use singular terms when defining one concept and plural terms when discussing multiple instances.
- Prefer `and` in prose instead of `&`.
- Put punctuation outside inline code unless it is part of the literal code.
- Use consistent names within prose and code.
- Introduce an abbreviation before relying on it, unless it is universally understood in context.

## Recommended Note Structure

Longer concept and pattern notes should generally follow this structure when the content supports it:

```markdown
> Concise definition.

## Why do I need it?

Explain the problem and the central takeaway.

## How does it work?

Explain the mechanism or key parts.

### Example: Memorable scenario

Explain the scenario, then show the code or diagram.

## Related concepts

Link only to directly relevant notes.
```

This is a guideline, not a required template. Omit sections that would add no value.
