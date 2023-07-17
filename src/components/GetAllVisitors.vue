<template>
	<section>
	  <div class="action-container">
	    <router-link class="btn btn-primary" to='/addVisitor'>
	      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
	      Add visitor
	    </router-link>
	  </div>
	  <table class="table visitors-container">
	    <thead>
	    <tr>
	      <th @click="setSort('firstName')" class="sortable" :class="{ active: this.isActiveFirstName }">First name</th>
	      <th @click="setSort('lastName')" class="sortable" :class="{ active: this.isActiveLastName }">Last name</th>
	      <th @click="setSort('visitDate')" class="sortable" :class="{ active: this.isActiveVisitDate }">Visit date</th>
	      <th class="col-sm-2">Actions</th>
	    </tr>
	    </thead>
	    <tbody v-if="this.visitors.length > 0">
	    <tr v-for="(visitor, index) in this.visitors" :key="index">
		      <td>
		        <router-link :to="{ name: 'get-one-visitor', params: { id: visitor.id } }">{{ visitor.firstName }}</router-link>
		      </td>
		      <td>{{ visitor.lastName }}</td>
		      <td>{{ visitor.visitDate }}</td>
		      <td>
		        <router-link class="distance btn btn-warning btn-xs" :to="{ name: 'update-visitor', params: { id: visitor.id } }">Update</router-link>
		        <button class="distance btn btn-danger btn-xs" @click="removeVisitor(visitor.id)">Remove</button>
		      </td>
		    </tr>
	    </tbody>
		<tbody v-else>
			<tr>
				<td colspan="4">Loading...</td>
			</tr>
		</tbody>
	  </table>
	  </section>
</template>
<script>
	import axios from 'axios';
	import { sort } from 'fast-sort';
	import { ref } from 'vue';
	import 'dotenv';

	const sortBy = ref(null);
	const sortDesc = ref(null);
	const endpoint = process.env.ENDPOINT;  //paste here your backend endpoint URL
	export default {
		name: 'visitors',
		data() {
			return {
				visitors: [],
				isActiveFirstName: false,
				isActiveLastName: false,
				isActiveVisitDate: false
			}
		},
		mounted() {
			this.getAllVisitors();
		},
		methods: {
			getAllVisitors() {
				axios.get(endpoint + 'visitors').then(response => {
					this.visitors = response.data.data;
				});
			},
			setSort(key) {
				if (sortBy.value === key) {
					if (sortDesc.value === true) sortDesc.value = null;
					else if (sortDesc.value === false) sortDesc.value = true;
					else sortDesc.value = false;
				} else {
					sortBy.value = key;
					sortDesc.value = false;
				}
				if (sortDesc.value !== null) {
					if (sortDesc.value) {
						this.visitors = sort(this.visitors).desc(v => v[sortBy.value]);
					} else {
						this.visitors = sort(this.visitors).asc(v => v[sortBy.value]);
					};
				}
				if (sortBy.value === 'firstName') {
					this.isActiveFirstName = true;
					this.isActiveLastName = false;
					this.isActiveVisitDate = false;
				} else if (sortBy.value === 'lastName') {
					this.isActiveFirstName = false;
					this.isActiveLastName = true;
					this.isActiveVisitDate = false;
				} else if (sortBy.value === 'visitDate') {
					this.isActiveFirstName = false;
					this.isActiveLastName = false;
					this.isActiveVisitDate = true;
				};
			},
			removeVisitor(visitorId) {
				if(confirm('Are you sure you want to remove this visitor from list?')) {
					axios.delete(endpoint + 'visitor/' + visitorId)
					.then(response => {
						console.log(response.message);
						this.getAllVisitors();
					});
				}
			},
		}
	}
</script>
<style>
.distance {
	margin-bottom: 5px;
}
.visitors-container {
	width: 50%;
	text-align: center;
	margin: 0 auto;
}
.action-container {
	display: flex;
	margin-left: 1rem;
	margin-top: 5px;
}
.active {
	color: rgb(143, 0, 253) !important;
}
.sortable {
	user-select: none;
	cursor: pointer;
}
</style>