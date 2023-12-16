import { defineStore } from 'pinia'
interface User {
    username: string,
    token: string
}
export const useUserStore = defineStore('user', {
    state: (): User => ({
        username: '',
        token: ''
    }),
    actions: {
        setUsername(userName: string): void {
            this.username = userName
        },
        setToken(token: string): void {
            this.token = token
        }
    }
})