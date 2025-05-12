export function getContentGithubUrl({
  filename,
  folder,
  language = 'en',
}: {
  filename: string
  folder?: string
  language?: 'en' | 'zh'
}) {
  return `blob/master/web/src/content/${language}/${folder ? `${folder}/` : ''}${filename}`
}
