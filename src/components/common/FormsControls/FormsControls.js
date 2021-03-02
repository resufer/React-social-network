import style from './FormsControls.module.css';

let formControl = Element => ({ input, meta, ...props }) => {
  let hasError = meta.error && meta.touched;
  return (
    <div className={style.formControl + ' ' + (hasError ? style.error : '')}>
      {hasError && <span>{meta.error}</span>}
      <div><Element {...props} {...input} /></div>
    </div >
  )
}

export let Input = formControl('input');
export let Textarea = formControl('textarea');