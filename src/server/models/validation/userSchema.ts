const yup = require('yup')

module.exports = yup.object({
    email: yup.string().required('email is required').email('Must be a valid email'),
    password: yup.string().min(8, 'Must be at least 8 characters').required('password is required')
})