export function createCodeBlock(title, answer, id, template) {
  let excersize = new Object();
  excersize.title = title;
  excersize.answer = answer;
  excersize.template = template;
  excersize.id = id;
  return excersize;
}
