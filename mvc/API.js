export default {
    async getDogs() {
        const response = await fetch('https://barkwireapi.brooks.vercel.app/dogs');

        return response.json();
    },

    async getDog(id) {
        const response = await fetch(`https://barkwireapi.brooks.vercel.app/dogs/${id}`);

        return response.json();
    },

}