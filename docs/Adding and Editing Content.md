# Adding and Editing Content

This web application uses on [Next.js framework](https://nextjs.org/docs) (based on React).

Additionally, most of the text content is rendered from Markdown files using [MDX.js](https://mdxjs.com/) package. It
allows to transform `.md` and `.mdx` files and use them as React components.

In the end, everything is a React component.


## Add a new page


In general, all the "navigable" pages are in `web/src/pages`. To add a new page, you need to add a file, in either of these formats: 

 - js, jsx, ts, tsx: should have a React component as default export 
   
 - md, mdx: should be a Markdown or MDX document

The URL of the page will be the same as the name of the file (without extension).

For example if you add `web/src/pages/foo.md`, you can then navigate to `/foo` in a browser and see the rendered markdown content of the file.

`index.tsx` is the main page, it's URL is `/`.

Next.js, by convention, has a few special "pages" starting with "_". 


Currently, files in `web/src/pages/` are pretty empty and simply another component, so that all the React code actually lives in `web/src/components`.


## Modify an existing page

To modify an existing page, you need to modify the React component tree which starts in the corresponding file in `web/src/pages`.


For example, `index.tsx` imports `web/src/components/Main/MainPage.tsx` - this is the code for the main page.

Further, `faq.tsx` imports `web/src/components/Faq/FaqPage.tsx` which imports and uses `Faq` component taken from `content/Faq.md`.


## Modify navigation links

Links on navigation bar (on top of every page) are in this object:

web/src/components/Layout/NavigationBar.tsx#L17-L21

the keys are the page URLs (which are names of files in `web/src/pages`) and the values are the visible text of these links.
