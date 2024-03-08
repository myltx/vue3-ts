
<script setup lang="ts">
const props = defineProps({
  msg: {
    type: String,
    default: 'hello'
  }
})
</script>
<template>
	{{ msg }}
	<div>
		loading
	</div>
</template>

<style scoped>

</style>
