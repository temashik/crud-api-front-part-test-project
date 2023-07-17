<template>
	<section class="visitor-container">
		<h2>Update visitor</h2>
		<div>
			<div class="form-group">
				<label for="first-name">First name</label>
				<input class="form-control" id="first-name" v-model="model.visitor.firstName" placeholder="Enter first name (required)"/>
			</div>
			<div class="form-group">
				<label for="last-name">Last name</label>
				<input class="form-control" id="last-name" v-model="model.visitor.lastName" placeholder="Enter last name (required)"/>
			</div>
			<div v-if="this.model.visitor.firstName != '' && this.model.visitor.lastName != ''">
				<button type="submit" @click="updateVisitor" class="distance btn btn-success">Update</button>
			</div>
			<router-link to="/" class="distance btn btn-danger">Cancel</router-link>
		</div>
	</section>
</template>
<script>
import axios from 'axios';
import router from '../router/index';

const endpoint = process.env.ENDPOINT;  //paste here your backend endpoint URL
export default {
	props: ['id'],

	data() {
		return {
			model: {
				visitor: {
					firstName: "",
					lastName: ""
				}
			}
		}
	},

	methods: {
		updateVisitor(id) {
			axios.put(endpoint + 'visitor/' + this.id, this.model.visitor)
				.then(response => {
					console.log(response.message);
					router.push('/');
				})
				.catch(error => {
					console.log('-----error-------');
					console.log(error)
				})
		}
	},

	watch: {
		'$route'() {
			this.updateVisitor(this.id);
		}
	}
}
</script>
<style>
.visitor-container {
	margin-left: 1rem;
}
.distance {
	margin-top: 5px;
	margin-left: 1px;
	margin-right: 1px;
}
</style>