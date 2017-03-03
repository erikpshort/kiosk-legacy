<template>
  <div class="service-request">
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
        <input v-model="ModelValue" placeholder="Model" id="Model" type="text">
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
          <div v-show="showSubmitButton" class="submitButton">
            <button @click="returnSelection()" class="waves-effect waves-light btn ">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>

  let equipment = {
    Chainsaw:{
      models: ['Remmington', 'Makita', 'Polan']
    },
    TwoStroke:{
      models: ['twoStrokeA', 'twoStrokeB', 'twoStrokeC']
    },
    FourStroke:{
      models: ['fourStrokeA', 'fourStrokeB', 'fourStrokeC']
    },
  }

  export default {
    name: 'test',
    data() {
      return {
        msg: 'Enter Your Service Request',
        showSubmitButton: false,
        equipmentTypeGreen: false,
        MakeGreen: false,
        TuneGreen: false,
        Regular: false,

        equipmentTypeValue: '',
        MakeValue: '',
        ModelValue: '',
        TuneValue: '',
        RegularValue: '',

      }
    },
    mounted(){
      $('.service-request .dropdown-button').dropdown()
    },
    methods: {
      makeLi: function (dropText) {
        //This function creates the elements to be used in the dropdown for the second, "B" button.
        //dropText is the text to be shown in the dropdown menu.
        //It returns an li element that needs to be added to the ul tag in the calling function.
        var new_li = document.createElement("li")
        var new_span = document.createElement("span")
        new_span.innerText = dropText
        new_span.addEventListener("click", () => this.B_Clicked(dropText));
        new_li.appendChild(new_span)
        return new_li
      },

      //This function called when a selection is made in the dropdown for the first, "A" button.
      A_Clicked: function (code) {
        //Set the value of the selection in the local data section.
        this.equipmentTypeValue = code;
        //Indicate a selection has been made on this button and check if we should show the submit button.
        this.equipmentTypeGreen = true;
        this.checkShowSubmit()

        var dom_but01 = document.getElementById("btn01")
        if (code == 'Chainsaw') {
          dom_but01.innerText = code;
          //populate the MAKE dropdown menu based upon the fact that we have selected chainsaw.
          var ul02 = document.getElementById('dropdown2')

          //Clear any old li elements from dropdown (will be present if a previous selection was made)
          while (ul02.childElementCount > 0)
          {ul02.removeChild(ul02.childNodes[0])}
          
          //loop over the equipment chainsaw models object to create the li elements for the second button.
          for (var i = 0; i < equipment.Chainsaw.models.length; i++)
          {
            //populate the choices avaiable on the second button.
            ul02.appendChild(this.makeLi(equipment.Chainsaw.models[i]))
          }
          //change the color of the button to green to indicate a selection has been made.
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
      },
      //This function called when a selection is made in the dropdown for the second, "B" button.
      B_Clicked: function (code) {
        this.MakeValue = code;
        this.MakeGreen = true;
        this.checkShowSubmit()
        var dom_but02 = document.getElementById("btn02")
        dom_but02.setAttribute('class', 'dropdown-button btn green')
        dom_but02.innerText = code;
      },
      //This function called when a selection is made in the dropdown for the third, "C" button.
      C_Clicked: function (code) {
        this.TuneValue = code;
        this.TuneGreen = true;
        this.checkShowSubmit()
        var dom_but03 = document.getElementById("btn03")
        dom_but03.setAttribute('class', 'dropdown-button btn green')
        dom_but03.innerText = code;
      },
      //This function called when a selection is made in the dropdown for the fourth, "D" button.
      D_Clicked: function (code) {
        this.RegularValue = code;
        this.Regular = true;
        this.checkShowSubmit()
        var dom_but04 = document.getElementById("btn04")
        dom_but04.setAttribute('class', 'dropdown-button btn green')
        dom_but04.innerText = code;
      },
      checkShowSubmit: function () {
        if (this.Regular && this.TuneGreen && this.MakeGreen && this.equipmentTypeGreen) {
          this.showSubmitButton = true;
        }
      },
      //this is a placeholder function to report out the values that are to be sent on submit.
      returnSelection: function(){
        console.log("---submit has been pressed---")
        console.log("Equipment Type:",this.equipmentTypeValue)
        console.log("Make Value:",this.MakeValue)
        console.log("Model Value:",this.ModelValue)
        console.log("Tune Value:",this.TuneValue)
        console.log("Regular Value:",this.RegularValue)
      }
    },
  }
</script>

<style>
</style>

