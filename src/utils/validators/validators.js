export const requiredFields = value => {
  return value ? undefined : 'Field is required'
}

export const maxLengthCreator = maxLength => value => {
  return value && value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined
}

export const obsceneLanguage = word => {
  let abuse = ['shit', 'bitch', 'asshole', 'arsehole', 'bullshit', 'fuck', 'bastard', 'dick', 'cock', 'pussy', 'motherfucker', 'cunt',
    'бля', 'сука', 'хуй', 'хуя', 'хую', 'еба', 'пизд', 'твар', 'член'];
  for (let i = 0; i < abuse.length; i++) {
    if (word.indexOf(abuse[i]) !== -1) return 'obscene language is prohibited'
  }
  return undefined;
}