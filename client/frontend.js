import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.10/dist/vue.esm.browser.js'

Vue.component('loader', {
    template:
        `<div style="display: flex; justify-content: center; align-items: center;">
          <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Загрузка...</span></div>
        </div>`
})

new Vue({
    el: '#app',
    data() {
        return {
            loading: false,
            IsClosedWindow: false,
            form: {
                name: '',
                surname: '',
                description: ''
            },
            contacts: []
        }
    },
    computed: {
        canCreate() {
            return this.form.surname.trim() && this.form.name.trim() && this.form.description.trim()
        }
    },
    methods: {
        async createContact() {

            const {...contact} = this.form

            const newContact = await request('/api/contacts', 'POST', contact)

            this.contacts.push(newContact)

            this.form.name = this.form.surname = this.form.description = ''
        },

        markContact(id) {
            const contact = this.contacts.find(c => c.id === id)
            contact.marked = true
        },
        async removeContact(id) {
            await request(`/api/contacts/${id}`, 'DELETE')
            this.contacts = this.contacts.filter(c => c.id !== id)
        },
        closeWindow() {
            this.IsClosedWindow = true
        }
    },
    async mounted() {
        this.loading = true
        this.contacts = await request('/api/contacts')
        this.loading = false
    }
})

async function request(url, method = 'GET', data = null) {

    try {
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)

        }

        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: body
        })

        return await response.json()
    } catch (err) {
        console.warn('Error: ' + err.message)
    }
}
