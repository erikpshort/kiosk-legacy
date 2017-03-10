<template>
  <div class="service-request">
    <h1>{{msg}}</h1>
    <div class="row">
      <div class="col s3">
        <!-- Dropdown Trigger -->
        <span id='btn01' class='dropdown-button btn red' href='#' data-activates='dropdown1'>Equipment Type</span>
        <!-- Dropdown Structure -->
        <ul id='dropdown1' class='dropdown-content'>
          <li><span v-for="model in equipment" @click="A_Clicked(model)" v-model='modelName'>{{model.name}}</span></li>
        </ul>
      </div>
      <div v-show = "showMakeButton" class="col s2">
        <span id='btn02' class='dropdown-button btn red' href='#' data-activates='dropdown2'>Make</span>
        <!-- Dropdown Structure -->
        <ul id='dropdown2' class='dropdown-content'>
          <!-- The contents of this dropdown are dynamically constructed based upon the choice from button 01 -->
        </ul>
      </div>
      <div v-show = "showModelButton" class="col s2">
        <input v-model="ModelValue" placeholder="Model" id="Model" type="text">
      </div>
      <div v-show = "showTuneButton" class="col s2">
        <a id='btn03' class='dropdown-button btn red' href='#' data-activates='dropdown3'>Tune / Repair</a>
        <!-- Dropdown Structure -->
        <ul id='dropdown3' class='dropdown-content'>
          <li><span @click="C_Clicked('Tune-up')">Tune-up</span></li>
          <li><span @click="C_Clicked('Repair')">Repair</span></li>
        </ul>
      </div>
      <div v-show="showExpressButton" class="col s2">
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
  export default {
    name: 'test',
    data() {
      return {
        modelName: '',
        msg: 'Enter Your Service Request',
        
        //flags indicating if buttons are visible. 
        showTypeButton: true,
        showMakeButton: true, 
        showModelButton: true,
        showTuneButton: true,
        showExpressButton: false, //defaults to false on inital screen.
        showSubmitButton: false, //defaults to false on inital screen. 
        
        //flags indicating if buttons color should be green.         
        equipmentTypeGreen: false,
        MakeGreen: false,
        TuneGreen: false,
        Regular: false,

        //Variables to hold values selected by user. 
        equipmentTypeValue: '',
        MakeValue: '',
        ModelValue: '',
        TuneValue: '',
        RegularValue: '',

        //Data to populate dropdown buttons. //Modify with care.
        //At some point will this data live in the database and not need to be hard coded?
        equipment: {
          ChainBlade: {
            manufact: ['N/A'],
            name: 'Chain/Blade Sharpen',
            argument: 'ChainBlade',
          },
          HandheldPower: {
            manufact: ['Stihl', 'Echo', 'Husquvarna'],
            type: ['Blower', 'Trimmer', 'Chainsaw', 'Backpack Blower', 'Sprayer', 'Concrete saw', 'other'],
            name: 'Handheld Power',
            argument: 'HandheldPower'
          },
          HomeOwnerWalkBehind: {
            manufact: ['Toro', 'Honda', 'Craftsman', 'Yardman', 'Husquvarna', 'John Deere', 'Exmark', 'Cub Cadet', 'other'],
            name: 'Homeowner Walk Behind',
            argument: 'HomeOwnerWalkBehind'
          },
          HomeOwnerZeroTurn: {
            manufact: ['Toro', 'Honda', 'Craftsman', 'Yardman', 'Husquvarna', 'John Deere', 'Exmark', 'Cub Cadet', 'other'],
            name: 'Homeowner Zero Turn',
            argument: 'HomeOwnerZeroTurn'
          },
          HomeownerTractor: {
            manufact: ['Toro', 'Honda', 'Craftsman', 'Yardman', 'Husquvarna', 'John Deere', 'Exmark', 'Cub Cadet', 'other'],
            name: "Homeowner Tractor",
            argument: 'HomeOwnerTractor'
          },
          CommercialWalk: {
            manufact: ['Toro', 'Honda', 'Husquvarna', 'John Deere', 'Exmark', 'other'],
            name: 'Commercial Walk',
            argument: 'CommercialWalk'
          },
          CommercialDeck: {
            manufact: ['Toro', 'Scag', 'Husquvarna', 'John Deere', 'Exmark', 'other'],
            name: 'Commercial Deck',
            argument: 'CommercialDeck'
          },
          CommercialRider: {
            manufact: ['Toro', 'Scag', 'Husquvarna', 'John Deere', 'Exmark', 'other'],
            name: 'Commercial Rider',
            argument: 'CommercialRider'
          },
          Other: {
            manufact: ['Generator', 'Pressure washer', 'Rototiller', 'Snow Blower'],
            name: 'Other',
            argument: 'Other'
          }
        }
      }
    },
    mounted() {
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
      A_Clicked: function (model) {
        console.log("The" + model.name + " has been selected.")
        //Set the value of the selection in the local data section.
        this.equipmentTypeValue = model.name;
        //Indicate a selection has been made on this button and check if we should show the submit button.
        this.equipmentTypeGreen = true;
        this.checkShowSubmit()

        if (model.argument != 'ChainBlade')
        {
        this.showButtons()
        } 

        var dom_but01 = document.getElementById("btn01")
        if (model.argument == 'ChainBlade') 
          {
          dom_but01.innerText = model.name;
          var ul02 = document.getElementById('dropdown2')
          //Clear any old li elements from dropdown (will be present if a previous selection was made)
          while (ul02.childElementCount > 0) {
            ul02.removeChild(ul02.childNodes[0])
          }
          //loop over the equipment HandheldPower models object to create the li elements for the second button.
          for (var i = 0; i < model.manufact.length; i++) {
            //populate the choices avaiable on the second button.
            ul02.appendChild(this.makeLi(model.manufact[i]))
          }
          //change the color of the button to green to indicate a selection has been made.
          dom_but01.setAttribute('class', 'dropdown-button btn green')
          
          //Per buseiness logic hide the buttons. 
          this.hideButtonsForSharp()
        } else if (model.argument == 'HandheldPower') {
          dom_but01.innerText = model.name;
          //populate the MAKE dropdown menu based upon the fact that we have selected HandheldPower.
          var ul02 = document.getElementById('dropdown2')

          //Clear any old li elements from dropdown (will be present if a previous selection was made)
          while (ul02.childElementCount > 0)
          { ul02.removeChild(ul02.childNodes[0]) }
          //loop over the equipment HandheldPower models object to create the li elements for the second button.
          for (var i = 0; i < model.manufact.length; i++) {
            //populate the choices avaiable on the second button.
            console.log("hello", model.manufact[i])
            ul02.appendChild(this.makeLi(model.manufact[i]))
          }
          //change the color of the button to green to indicate a selection has been made.
          dom_but01.setAttribute('class', 'dropdown-button btn green')

          this.showTypeButton = true
          this.showMakeButton = true
          this.showModelButton = true
          this.showTuneButton = true
          this.showExpressButton = false 
          this.showSubmitButton = false 
        }
        else if (model.argument == 'HomeOwnerWalkBehind') {
          dom_but01.innerText = model.name;
          //populate the MAKE dropdown menu based upon the fact that we have selected HandheldPower.
          var ul02 = document.getElementById('dropdown2')

          //Clear any old li elements from dropdown (will be present if a previous selection was made)
          while (ul02.childElementCount > 0)
          { ul02.removeChild(ul02.childNodes[0]) }
          //loop over the equipment HandheldPower models object to create the li elements for the second button.
          for (var i = 0; i < model.manufact.length; i++) {
            //populate the choices avaiable on the second button.
            console.log("hello", model.manufact[i])
            ul02.appendChild(this.makeLi(model.manufact[i]))
          }
          //change the color of the button to green to indicate a selection has been made.
          dom_but01.setAttribute('class', 'dropdown-button btn green')
        }
        else if (model.argument == 'HomeOwnerZeroTurn') {
          dom_but01.innerText = model.name;
          //populate the MAKE dropdown menu based upon the fact that we have selected HandheldPower.
          var ul02 = document.getElementById('dropdown2')

          //Clear any old li elements from dropdown (will be present if a previous selection was made)
          while (ul02.childElementCount > 0)
          { ul02.removeChild(ul02.childNodes[0]) }
          //loop over the equipment HandheldPower models object to create the li elements for the second button.
          for (var i = 0; i < model.manufact.length; i++) {
            //populate the choices avaiable on the second button.
            console.log("hello", model.manufact[i])
            ul02.appendChild(this.makeLi(model.manufact[i]))
          }
          //change the color of the button to green to indicate a selection has been made.
          dom_but01.setAttribute('class', 'dropdown-button btn green')
        } else if (model.argument == 'HomeownerTractor') {
          dom_but01.innerText = model.name;
          //populate the MAKE dropdown menu based upon the fact that we have selected HandheldPower.
          var ul02 = document.getElementById('dropdown2')

          //Clear any old li elements from dropdown (will be present if a previous selection was made)
          while (ul02.childElementCount > 0)
          { ul02.removeChild(ul02.childNodes[0]) }
          //loop over the equipment HandheldPower models object to create the li elements for the second button.
          for (var i = 0; i < model.manufact.length; i++) {
            //populate the choices avaiable on the second button.
            console.log("hello", model.manufact[i])
            ul02.appendChild(this.makeLi(model.manufact[i]))
          }
          //change the color of the button to green to indicate a selection has been made.
          dom_but01.setAttribute('class', 'dropdown-button btn green')
        } else if (model.argument == 'CommercialWalk') {
          dom_but01.innerText = model.name;
          //populate the MAKE dropdown menu based upon the fact that we have selected HandheldPower.
          var ul02 = document.getElementById('dropdown2')

          //Clear any old li elements from dropdown (will be present if a previous selection was made)
          while (ul02.childElementCount > 0)
          { ul02.removeChild(ul02.childNodes[0]) }
          //loop over the equipment HandheldPower models object to create the li elements for the second button.
          for (var i = 0; i < model.manufact.length; i++) {
            //populate the choices avaiable on the second button.
            console.log("hello", model.manufact[i])
            ul02.appendChild(this.makeLi(model.manufact[i]))
          }
          //change the color of the button to green to indicate a selection has been made.
          dom_but01.setAttribute('class', 'dropdown-button btn green')
        } else if (model.argument == 'CommercialDeck') {
          dom_but01.innerText = model.name;
          //populate the MAKE dropdown menu based upon the fact that we have selected HandheldPower.
          var ul02 = document.getElementById('dropdown2')

          //Clear any old li elements from dropdown (will be present if a previous selection was made)
          while (ul02.childElementCount > 0)
          { ul02.removeChild(ul02.childNodes[0]) }
          //loop over the equipment HandheldPower models object to create the li elements for the second button.
          for (var i = 0; i < model.manufact.length; i++) {
            //populate the choices avaiable on the second button.
            console.log("hello", model.manufact[i])
            ul02.appendChild(this.makeLi(model.manufact[i]))
          }
          //change the color of the button to green to indicate a selection has been made.
          dom_but01.setAttribute('class', 'dropdown-button btn green')
        } else if (model.argument == 'CommercialRider') {
          dom_but01.innerText = model.name;
          //populate the MAKE dropdown menu based upon the fact that we have selected HandheldPower.
          var ul02 = document.getElementById('dropdown2')

          //Clear any old li elements from dropdown (will be present if a previous selection was made)
          while (ul02.childElementCount > 0)
          { ul02.removeChild(ul02.childNodes[0]) }
          //loop over the equipment HandheldPower models object to create the li elements for the second button.
          for (var i = 0; i < model.manufact.length; i++) {
            //populate the choices avaiable on the second button.
            console.log("hello", model.manufact[i])
            ul02.appendChild(this.makeLi(model.manufact[i]))
          }
          //change the color of the button to green to indicate a selection has been made.
          dom_but01.setAttribute('class', 'dropdown-button btn green')
        } else if (model.argument == 'Other') {
          dom_but01.innerText = model.name;
          //populate the MAKE dropdown menu based upon the fact that we have selected HandheldPower.
          var ul02 = document.getElementById('dropdown2')

          //Clear any old li elements from dropdown (will be present if a previous selection was made)
          while (ul02.childElementCount > 0)
          { ul02.removeChild(ul02.childNodes[0]) }
          //loop over the equipment HandheldPower models object to create the li elements for the second button.
          for (var i = 0; i < model.manufact.length; i++) {
            //populate the choices avaiable on the second button.
            console.log("hello", model.manufact[i])
            ul02.appendChild(this.makeLi(model.manufact[i]))
          }
          //change the color of the button to green to indicate a selection has been made.
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
      returnSelection: function () {
        console.log("---submit has been pressed---")
        console.log("Equipment Type:", this.equipmentTypeValue)
        console.log("Make Value:", this.MakeValue)
        console.log("Model Value:", this.ModelValue)
        console.log("Tune Value:", this.TuneValue)
        console.log("Regular Value:", this.RegularValue)
      },
      hideButtonsForSharp: function () {
        console.log("Since sharpening has been selected we hide buttons.") 
        //Per business logic if the Chain / Blade Sharpen has been selected by the 
        //customer, there is no need for them to use the other three buttons so we 
        //hide them here.
          this.showTypeButton = true
          this.showMakeButton = false;
          this.showModelButton = false
          this.showTuneButton = false
          this.showExpressButton = false 
          this.showSubmitButton = true 
      },
      showButtons: function () {
        console.log("Since sharpening has not been selected we show buttons.") 
          this.showTypeButton = true
          this.showMakeButton = true
          this.showModelButton = true
          this.showTuneButton = true
          this.showExpressButton = false  // default to false 
          this.showSubmitButton = false //default to false
      },
    },
  }

</script>

<style>

</style>