<template>
  <div class="root">

    <h1>{{msg}}</h1>


    <!-- Dropdown Trigger -->
    <span id='btn01' class='dropdown-button btn red' href='#' data-activates='dropdown1'>Equipment Type</span>

    <!-- Dropdown Structure -->
    <ul id='dropdown1' class='dropdown-content'>
      <li><span @click="A_Clicked('Chainsaw')">Chainsaw</span></li>
      <li><span @click="A_Clicked('Two-Stroke')">Two-Stroke</span></li>
      <li><span @click="A_Clicked('Four-Stroke')">Four-Stroke</span></li>
    </ul>


    <span id='btn02' class='dropdown-button btn red' href='#' data-activates='dropdown2'>Make</span>

    <!-- Dropdown Structure -->
    <ul id='dropdown2' class='dropdown-content'>
    <!-- The contents of this dropdown are dynamically constructed based upon the choice from button 01 -->
    </ul>

    <a id='btn03' class='dropdown-button btn red' href='#' data-activates='dropdown3'>Model</a>

    <ul id='dropdown3' class='dropdown-content'>
      <li><span @click="B_Clicked('1')">two</span></li>
      <li><span @click="B_Clicked('2')">two</span></li>
      <li><span @click="B_Clicked('3')">three</span></li>
    </ul>

    <a id='btn04' class='dropdown-button btn red' href='#' data-activates='dropdown4'>Tune / Repair</a>

    <!-- Dropdown Structure -->
    <ul id='dropdown4' class='dropdown-content'>
      <li><span @click="B_Clicked('1')">one</span></li>
      <li><span @click="B_Clicked('2')">two</span></li>
      <li><span @click="B_Clicked('3')">three</span></li>
    </ul>

    <a id='btn05' class='dropdown-button btn red' href='#' data-activates='dropdown5'>Regular / Rush</a>

    <!-- Dropdown Structure -->
    <ul id='dropdown5' class='dropdown-content'>
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
      makeLi: function(dropText){
        console.log("in makeLi")
        //Create the new list and span elements.
        var new_li = document.createElement("li")
        var new_span = document.createElement("span")
        new_span.innerText = dropText
        new_span.addEventListener("click", ()=> this.B_Clicked(dropText));
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