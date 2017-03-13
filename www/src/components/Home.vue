<template>
    <div class="home">
        <div class="row">
            <div id="">
                <div col-md-3 offset-6 class="right-align home">
                     <router-link :to="'/home'">{{msg}}</router-link>
                </div>
                <div class="row">
                    <span> <img src="../assets/legacyLogo.png"></span>
                </div>
            </div>
            
        <router-view></router-view>

        </div>
    </div>
</template>





<script>
    export default {
        name: 'home',
        data() {
            return {
                msg: 'Home',
                phone: ''
            }
        },
    }

</script>

<style>
.home{
    font-size: 20px;
    font-weight: bold;
    margin-right: 35px;
}
</style>