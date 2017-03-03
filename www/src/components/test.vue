<template>
  <div class="root">

    <h1>{{msg}}</h1>


    <div class="row">

      <div class="col s1">

      </div>

      <div class="col s2">
        <!-- Dropdown Trigger -->
        <span id='btn01' class='dropdown-button btn red' href='#' data-activates='dropdown1'>Equipment Type</span>

        <!-- Dropdown Structure -->
        <ul id='dropdown1' class='dropdown-content'>
          <li><span @click="A_Clicked('Chainsaw')">Chainsaw</span></li>
          <li><span @click="A_Clicked('Two-Stroke')">Two-Stroke</span></li>
          <li><span @click="A_Clicked('Four-Stroke')">Four-Stroke</span></li>
        </ul>

      </div>

      <div class="col s2">

        <span id='btn02' class='dropdown-button btn red' href='#' data-activates='dropdown2'>Make</span>

        <!-- Dropdown Structure -->
        <ul id='dropdown2' class='dropdown-content'>
          <!-- The contents of this dropdown are dynamically constructed based upon the choice from button 01 -->
        </ul>

      </div>

      <div class="col s2">

        <input placeholder="Model" id="Model" type="text">
      </div>

      <div class="col s2">

        <a id='btn03' class='dropdown-button btn red' href='#' data-activates='dropdown3'>Tune / Repair</a>

        <!-- Dropdown Structure -->
        <ul id='dropdown3' class='dropdown-content'>
          <li><span @click="C_Clicked('Tune-up')">Tune-up</span></li>
          <li><span @click="C_Clicked('Repiar')">Repair</span></li>
        </ul>
      </div>

      <div class="col s2">

        <span id='btn04' class='dropdown-button btn red' href='#' data-activates='dropdown4'>Regular / Rush</span>

        <!-- Dropdown Structure -->
        <ul id='dropdown4' class='dropdown-content'>
          <li><span @click="D_Clicked('Regular')">Regular</span></li>
          <li><span @click="D_Clicked('Express')">Express</span></li>
        </ul>
      </div>

<div class="row">
<div class="col s12">
<!--<button>Submit</button>-->
<a class="waves-effect waves-light btn grey">Submit</a>

</div>

</div>


    </div>
  </div>
  </div>

  </div>
</template>

<script>
  export default {
    name: 'test',
    data() {
      return {
        msg: 'Enter Your Service Request'
      }
    },
    methods: {
      makeLi: function (dropText) {
        console.log("in makeLi")
        //Create the new list and span elements.
        var new_li = document.createElement("li")
        var new_span = document.createElement("span")
        new_span.innerText = dropText
        new_span.addEventListener("click", () => this.B_Clicked(dropText));
        new_li.appendChild(new_span)
        return new_li
      },

      A_Clicked: function (code) {
        var dom_but01 = document.getElementById("btn01")
        var dom_but02 = document.getElementById("btn02")
        var dom_but03 = document.getElementById("btn03")
        var dom_but04 = document.getElementById("btn04")
        var dom_but05 = document.getElementById("btn05")

        console.log("Button A has been clicked with code: ", code)

        if (code == 'Chainsaw') {
          dom_but01.innerText = code;
          //set the options for the make dropdown based upon the fact that we have selected chainsaw.
          var ul02 = document.getElementById('dropdown2')
          //we can add makes in this section.
          ul02.appendChild(this.makeLi("Remmington"))
          ul02.appendChild(this.makeLi("Makita"))
          ul02.appendChild(this.makeLi("Polan"))
          //change the color of the button to green to indicated a successful choice.
          dom_but01.setAttribute('class', 'dropdown-button btn green')

        }
        else if (code == '2') {
          dom_but01.innerText = "Two-stroke"

          dom_but01.setAttribute('class', 'dropdown-button btn green')
        }
        else if (code == '3') {
          dom_but01.innerText = "Four-stroke"
          dom_but01.setAttribute('class', 'dropdown-button btn green')
        }
        //console.log(dom_but01)
      },


      B_Clicked: function (code) {
        var dom_but02 = document.getElementById("btn02")
        console.log("Button B has been clicked to indicate make: ", code)
        dom_but02.setAttribute('class', 'dropdown-button btn green')
        dom_but02.innerText = code;
        //console.log(dom_but02)
      },



      C_Clicked: function (code) {
        var dom_but03 = document.getElementById("btn03")
        console.log("Button C has been clicked to indicate tune up or repair: ", code)
        dom_but03.setAttribute('class', 'dropdown-button btn green')
        dom_but03.innerText = code;
        //console.log(dom_but02)
      },

      D_Clicked: function (code) {
        var dom_but04 = document.getElementById("btn04")
        console.log("Button D has been clicked to indicate expediate or regular service: ", code)
        dom_but04.setAttribute('class', 'dropdown-button btn green')
        dom_but04.innerText = code;
        //console.log(dom_but02)
      },


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