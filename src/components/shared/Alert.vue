<template>
                    <v-alert
                    @input="onClose"
                    border="right"
                    colored-border
                    type="error"
                    dismissible
                    :value="true"
                    >
                    {{text}}
                    </v-alert>
</template>

<script>
export default {
    props: ['text'],
    methods: {
        onClose (){
            this.$emit('dismissed')
        }
    }
}
</script>

<style>

</style>