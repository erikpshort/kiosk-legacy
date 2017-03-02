<template>
  <div class="root">

    <h1>{{msg}}</h1>


    <!-- Dropdown Trigger -->
    <a id='btn01' class='dropdown-button btn red' href='#' data-activates='dropdown1'>Equipment Type</a>

    <!-- Dropdown Structure -->
    <ul id='dropdown1' class='dropdown-content'>
      <li><span @click="A_Clicked('1')">Chainsaw</span></li>
      <li><span @click="A_Clicked('2')">Two-Stroke</span></li>
      <li><span @click="A_Clicked('3')">Four-Stroke</span></li>
    </ul>

    <a id='btn02' class='dropdown-button btn red' href='#' data-activates='dropdown2'>Make</a>

    <!-- Dropdown Structure -->
    <ul id='dropdown2' class='dropdown-content'>
      <li><span @click="B_Clicked('1')">one</span></li>
      <li><span @click="B_Clicked('2')">two</span></li>
      <li><span @click="B_Clicked('3')">three</span></li>
    </ul>

    <a id='btn02' class='dropdown-button btn red' href='#' data-activates='dropdown2'>Model</a>

    <!-- Dropdown Structure -->
    <ul id='dropdown2' class='dropdown-content'>
      <li><span @click="B_Clicked('1')">one</span></li>
      <li><span @click="B_Clicked('2')">two</span></li>
      <li><span @click="B_Clicked('3')">three</span></li>
    </ul>

        <a id='btn02' class='dropdown-button btn red' href='#' data-activates='dropdown2'>Tune / Repair</a>

    <!-- Dropdown Structure -->
    <ul id='dropdown2' class='dropdown-content'>
      <li><span @click="B_Clicked('1')">one</span></li>
      <li><span @click="B_Clicked('2')">two</span></li>
      <li><span @click="B_Clicked('3')">three</span></li>
    </ul>

        <a id='btn02' class='dropdown-button btn red' href='#' data-activates='dropdown2'>Regular / Rush</a>

    <!-- Dropdown Structure -->
    <ul id='dropdown2' class='dropdown-content'>
      <li><span @click="B_Clicked('1')">one</span></li>
      <li><span @click="B_Clicked('2')">two</span></li>
      <li><span @click="B_Clicked('3')">three</span></li>
    </ul>


  </div>

  </div>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data() {
      return {
        msg: 'This is a test component for button fields'
      }
    },
    methods: {
      A_Clicked: function (code) {
        console.log("Button A has been clicked with code: ", code)
        var dom_but01 = document.getElementById("btn01")

        if (code == '1') {
          dom_but01.innerText = "Option One"
          dom_but01.setAttribute('class', 'dropdown-button btn green')
        }
        else if (code == '2') {
          dom_but01.innerText = "Option Two"
          dom_but01.setAttribute('class', 'dropdown-button btn green')
        }
        else if (code == '3') {
          dom_but01.innerText = "Option Three"
          dom_but01.setAttribute('class', 'dropdown-button btn green')
        }
        //console.log(dom_but01)
      }

  }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .placeholder {
    font-size: 36px
  }



  #telephone {
    font-size: 36px;
    text-align: center;
  }

  {
    color: white;
  }
</style>