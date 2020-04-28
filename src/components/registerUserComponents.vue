<template>
    <div>
        <form>
            <v-text-field></v-text-field>
        </form>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name:"registerUserComponent",
    data(){
        return{
            user:{
                userName:null,
                userNameKana:null,
                mailAddress:null,
                hireDate:null,
                depId:null,
                password:null,
            }
        }
    },
    method:{
        getMailAddress(){
            this.mailAddress = this.getUserMailAddress()
        },
        
        ...mapGetters(["getUserMailAddress"])
    }
}
</script>