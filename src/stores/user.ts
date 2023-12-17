import { defineStore } from 'pinia'
interface User {
    username: string
}
export const useUserStore = defineStore('user', {
    state: (): User => ({
        username: '',
    }),
    actions: {
        setUsername(userName: string): void {
            this.username = userName
        }
    }
})