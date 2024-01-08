import { defineStore } from 'pinia'
interface User {
    username: string
    role: string;
}
export const useUserStore = defineStore('user', {
    state: (): User => ({
        username: '',
        role: ''
    }),
    actions: {
        setUsername(userName: string): void {
            this.username = userName
        },
        setRole(role: string): void {
            this.role = role;
        }
    }
})