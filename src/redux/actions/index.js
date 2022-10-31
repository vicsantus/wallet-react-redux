// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';

export const actUser = (email) => ({
  type: GET_EMAIL,
  email,
});
