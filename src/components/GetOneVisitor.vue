<template>
	 <section class="visitor-container">
		<b>First name: </b>
	  	<div>{{ visitor.firstName }}</div>
	  	<b>Last name: </b>
	  	<div>{{ visitor.lastName }}</div>
	  	<b>Visit date:</b>
	  	<div>{{ visitor.visitDate }}</div>
	  	<br/>
	  	<span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
	  	<router-link to="/">Back to visitors list</router-link>
	</section>
</template>

<script>
import axios from 'axios';

export default {
	props: ['id'],

	data() {
		return {
			visitor: "",
			endpoint: process.env.ENDPOINT,  //paste here your backend endpoint URL
		}
	},

	methods: {
		getVisitor(id) {
			axios.get(this.endpoint + 'visitor/' + id)
				.then(response => {
					this.visitor = response.data.data
				})
				.catch(error => {
					console.log('-----error-------');
					console.log(error)
				})
		}
	},

	created() {
		this.getVisitor(this.id);
	},

	watch: {
		'$route'() {
			this.getVisitor(this.id);
		}
	}
}
</script>
<style>
.visitor-container {
	margin-left: 1rem;
}
</style>