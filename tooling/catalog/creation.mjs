// Declarations describe production, independently of moderation and featured status.
export const creationMethods = Object.freeze({
  undeclared: {zh:'未声明', en:'Not declared'},
  human: {zh:'人工制作', en:'Human-made'},
  ai_assisted: {zh:'AI 辅助制作', en:'AI-assisted'},
  ai_generated: {zh:'主要由 AI 生成', en:'Primarily AI-generated'},
});
export function creationLabel(value, locale='zh') {
  return (creationMethods[value] || creationMethods.undeclared)[locale === 'en' ? 'en' : 'zh'];
}
export function normalizeCreation(input) {
  const method = input.creation_method === undefined ? 'undeclared' : input.creation_method;
  if (typeof method !== 'string' || !Object.hasOwn(creationMethods, method)) throw Error('请选择有效的制作方式。');
  const note = input.creation_note === undefined ? '' : input.creation_note;
  if (typeof note !== 'string' || note.length > 500 || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(note)) throw Error('制作说明最多 500 字。');
  return {creation_method:method, creation_note:note.trim()};
}
