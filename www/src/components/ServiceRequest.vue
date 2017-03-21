<template>
  <div>
    <div class="container" v-if="confirm">
      <div class="col s12">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <p>Please verify that the information below is correct.</p>
            <div class="row card-action" v-if="activeCustomer.company">
              <div class="col s4">
                <h4>{{activeCustomer.company}}</h4>
              </div>
              <div class="col s4">
                <h4 v-if="typeof activePhone != 'string'">{{selectedPhoneNum}}</h4>
                <h4 v-if="typeof activePhone == 'string'">{{activePhone}}</h4>
                <h4 v-if="activePhone.length == 1">{{activePhone[0]}}</h4>
              </div>
              <div class="col s4">
                <h4>{{activeCustomer.name}}</h4>
              </div>
            </div>
            <div class="row card-action" v-if="!activeCustomer.company">
              <div class="col s6">
                <h4>{{activeCustomer.name}}</h4>
              </div>
              <div class="col s6">
                <h4 v-if="typeof activePhone != 'string'">{{selectedPhoneNum}}</h4>
                <h4 v-if="typeof activePhone == 'string'">{{activePhone}}</h4>
              </div>
            </div>
            <div class="card-action row">
              <div class="col s6">
                <h4>Make: <b>{{activeJob.make}}</b></h4>
              </div>
              <div class="col s6">
                <h4>Model: <b>{{activeJob.model}}</b></h4>
              </div>
              <div class="row">
                <div class="col s12">
                  <h4>Type: <b>{{activeJob.type1}}</b></h4>
                </div>
              </div>
              <div class="row">
                <div class="col s6">
                  <h4>Tune-up/Repair: <b>{{activeJob.tUpRepExp}}</b></h4>
                </div>
                <div class="col s6">
                  <h4>Notes: <b>{{activeJob.customerNotes}}</b></h4>
                </div>
              </div>
            </div>
          </div>
          <div class="card-action">
            <div class="row">
              <div class="col s4" @click="returnSelectionNew()">
                <router-link :to="'/ServiceRequest'"><a>Correct Add Another</a></router-link>
              </div>
              <div class="col s4">
                <a @click="notConfirmed()">Change</a>
              </div>
              <div class="col s4" @click="returnSelection()">
                <a>Correct Finish</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="service-request" v-if="!confirm">
      <h1>{{msg}}</h1>
      <h3 v-if="typeof activePhone == typeof 'string'">{{this.$root.$data.store.state.activePhone}}</h3>
      <h3 v-if="activePhone.length == 1">{{this.$root.$data.store.state.activePhone[0]}}</h3>
      <form>
        <div class="input-field col s12" v-if="typeof activePhone != typeof 'string' && activePhone.length > 1">
          <label class="selectLabel">Please Select Phone Number</label>
          <select v-model="selectedPhoneNum">
        <option v-for="(phone, i) in activePhone">{{phone}}</option>
      </select>
          <br>
        </div>
        <div class="row">
          <div class="col s3">
            <!-- Dropdown Trigger -->
            <span id='btn01' class='dropdown-button btn red' href='#' data-activates='dropdown1'>Equipment Type<i class="fa fa-caret-down" aria-hidden="true"></i></span>
            <!-- Dropdown Structure -->
            <ul id='dropdown1' class='dropdown-content'>
              <li><span v-for="model in equipment" @click="A_Clicked(model)" v-model='modelName'>{{model.name}}</span></li>
            </ul>
          </div>
          <div v-show="showMakeButton" class="col s2">
            <span id='btn02' class='dropdown-button btn red' href='#' data-activates='dropdown2'>Make</span>
            <!-- Dropdown Structure -->
            <ul id='dropdown2' class='dropdown-content'>
              <!-- The contents of this dropdown are dynamically constructed based upon the choice from button 01 -->
            </ul>
          </div>
          <div v-show="showModelButton" class="col s2">
            <input v-model="ModelValue" placeholder="Model" id="Model" type="text">
          </div>
          <div v-show="showTuneButton" class="col s2">
            <a id='btn03' class='dropdown-button btn red' href='#' data-activates='dropdown3'>Tune / Repair</a>
            <!-- Dropdown Structure -->
            <ul id='dropdown3' class='dropdown-content'>
              <li><span @click="C_Clicked('Tune-up')">Tune-up</span></li>
              <li><span @click="C_Clicked('Repair')">Repair</span></li>
            </ul>
          </div>
          <input v-if="showOther" type="text" class="col s2" placeHolder="Make" v-model="makeForOther">
          <div v-show="showExpressButton" class="col s2">
            <span id='btn04' class='dropdown-button btn red' href='#' data-activates='dropdown4'>Regular / Rush</span>
            <!-- Dropdown Structure -->
            <ul id='dropdown4' class='dropdown-content'>
              <li><span @click="D_Clicked('Regular')">Regular</span></li>
              <li><span @click="D_Clicked('Express')">Express</span></li>
            </ul>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <textarea v-model="notesValue" id="textarea1" class="materialize-textarea"></textarea>
              <label for="textarea1">Customer Notes:</label>
            </div>
            <div class="row">
              <div class="col s12">
                <!--<button>Submit</button>-->
                <div v-show="showSubmitButton" class="submitButton">
                  <a class="waves-effect waves-light btn " @click.prevent="confirmation()">Submit and New</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data() {
      return {
        showOther: false,
        makeForOther: '',
        confirm: false,
        selectedPhoneNum: null,
        debugMode: true, //used to hard code options for debugging -- set to false in prod.
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
        notesValue: '',
        jobStatus: 'pending',
        //Manufactures for which express service is avaiable.
        express_manufact: ["Stihl", "Toro", "Scag"],
        //Data to populate dropdown buttons. //Modify with care.
        //At some point will this data live in the database and not need to be hard coded?
        equipment: {
          ChainBlade: {
            manufact: ['N/A'],
            name: 'Sharpen',
            argument: 'ChainBlade',
          },
          HandheldPower: {
            manufact: ['Stihl', 'Echo', 'Husquvarna'],
            type: ['Blower', 'Trimmer', 'Chainsaw', 'Backpack Blower', 'Sprayer', 'Concrete saw', 'other'],
            name: 'Handheld Power',
            argument: 'HandheldPower'
          },
          HomeownerWalkBehind: {
            manufact: ['Toro', 'Honda', 'Craftsman', 'Yardman', 'Husquvarna', 'John Deere', 'Exmark', 'Cub Cadet', 'other'],
            name: 'Homeowner Walk Behind',
            argument: 'HomeownerWalkBehind'
          },
          HomeownerZeroTurn: {
            manufact: ['Toro', 'Honda', 'Craftsman', 'Yardman', 'Husquvarna', 'John Deere', 'Exmark', 'Cub Cadet', 'other'],
            name: 'Homeowner Zero Turn',
            argument: 'HomeownerZeroTurn'
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
    computed: {
      activePhone() {
        return this.$root.store.state.activePhone
      },
      selectedPhoneNum() {
        return this.$root.store.state.activePhone
      },
      activeJob() {
        return this.$root.store.state.activeJob
      },
      activeCustomer() {
        return this.$root.store.state.activeCustomer
      }
    },
    mounted() {
      // setInterval(function () {
      //   $('.service-request .dropdown-button').dropdown()
      // }, 1500)
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
      clearButtonBDropDownList: function (dropText) {
        var ul02 = document.getElementById('dropdown2')
        while (ul02.childElementCount > 0) {  //while there is a child element (i.e. something in the dropdown)
          ul02.removeChild(ul02.childNodes[0])  //remove it.
        }
      },
      populateButtonBDropDownList: function (model) {
        var ul02 = document.getElementById('dropdown2')
        for (var i = 0; i < model.manufact.length; i++) {
          //populate the choices avaiable on the second button.
          ul02.appendChild(this.makeLi(model.manufact[i]))
          var dom_but01 = document.getElementById("btn01")
          dom_but01.setAttribute('class', 'dropdown-button btn green')
        }
      },
      //This function called when a selection is made in the dropdown for the first, "A" button.
      A_Clicked: function (model) {
        //Set the value of the selection in the local data section.
        this.equipmentTypeValue = model.name;
        //Indicate a selection has been made on this button and check if we should show the submit button.
        this.equipmentTypeGreen = true;
        this.checkShowSubmit()
        //Reset the B button -- we do this since a previous selection may have been made we now want to clear these old settings. 
        this.resetBButton()
        //Change the title of the "A" button.
        var dom_but01 = document.getElementById("btn01")
        var dom_but02 = document.getElementById("btn02")
        dom_but01.innerText = model.name;
        dom_but01.innerHTML = dom_but01.innerHTML + ' ' + '<i class="fa fa-caret-down" aria-hidden="true"></i>';
        if (model.argument != 'ChainBlade' && model.argument != 'Other') {
          this.showButtons()
          this.clearButtonBDropDownList()
          this.populateButtonBDropDownList(model)
        }
        else if (model.argument == 'ChainBlade') {
          dom_but01.innerText = model.name;
          this.clearButtonBDropDownList()
          this.populateButtonBDropDownList(model)
          //Per buseiness logic hide other buttons. 
          this.hideButtonsForSharp()
          //Need to set values for required model elements that are not supplied by buttons.
          this.TuneValue = 'chainBlade'
          this.MakeValue = 'chainBlade'
          this.ModelValue = 'chainBlade'
          this.whereAmI = 'WorkLog'
          this.jobStatus = 'working'
        }
        else if (model.argument == 'Other')  //for the monent this has same response as other but will need additioanl business logic, probalby?
        {
          dom_but01.innerText = model.name;
          dom_but02.innerText = "Type"
          this.clearButtonBDropDownList()
          this.populateButtonBDropDownList(model)
          //Per buseiness logic hide other buttons. 
          // this.hideButtonsForSharp()
          this.showOther = true
        }
      },
      //This function called when a selection is made in the dropdown for the second, "B" button.
      B_Clicked: function (make) {
        this.MakeValue = make;
        this.MakeGreen = true;
        this.checkShowSubmit()
        var dom_but02 = document.getElementById("btn02")
        dom_but02.setAttribute('class', 'dropdown-button btn green')
        dom_but02.innerText = make;
        //Expose the Express/Regular service if the store can support it.
        if (this.express_manufact.includes(make))
        { this.showExpressButton = true }
        else
        { this.showExpressButton = false }
      },
      //This function called when a selection is made in the dropdown for the third, "C" button.
      C_Clicked: function (code) {
        this.TuneValue = code;
        this.TuneGreen = true;
        var dom_but03 = document.getElementById("btn03")
        dom_but03.setAttribute('class', 'dropdown-button btn green')
        dom_but03.innerText = code;
        this.checkShowSubmit()
      },
      //This function called when a selection is made in the dropdown for the fourth, "D" button.
      D_Clicked: function (code) {
        this.RegularValue = code;
        this.RegularGreen = true;
        this.checkShowSubmit()
        var dom_but04 = document.getElementById("btn04")
        dom_but04.setAttribute('class', 'dropdown-button btn green')
        dom_but04.innerText = code;
      },
      checkShowSubmit: function () {
        //first check to see if the regular/rush button is showing:
        if (this.showExpressButton == true) {
          //Make sure all four buttons are green before showing the submit button
          if (this.equipmentTypeGreen && this.MakeGreen && this.TuneGreen && this.RegularGreen) {
            this.showSubmitButton = true;
          }
        }
        else {
          //Make sure the three visible buttons are green before showing the submit button. 
          if (this.equipmentTypeGreen && this.MakeGreen && this.TuneGreen) {
            this.showSubmitButton = true;
          }
        }
      },
      notConfirmed() {
        this.confirm = false
        $(document).ready(() => {
          $('.service-request .dropdown-button').dropdown()
          var x = this.equipmentTypeValue.split(' ').join('')
          this.A_Clicked(this.equipment[x])
        })
      },
      confirmation() {
        var object = {
          type1: this.equipmentTypeValue || null,
          type2: this.RegularValue,
          make: this.MakeValue,
          model: this.ModelValue,
          email: this.$root.$data.store.state.activeCustomer.email,
          tUpRepExp: this.TuneValue,
          jobNumber: 1001,
          customerNotes: this.notesValue,
          cellPhone: this.selectedPhoneNum,
          customerId: this.$root.$data.store.state.activeCustomer._id,
          jobStatus: this.jobStatus,
          whereAmI: this.whereAmI
        }
        console.log(object)
        if (this.ModelValue === '') {
          Materialize.toast('Please Enter Model', 4000)
        }
        else if (this.selectedPhoneNum != null) {
          console.log(this.selectedPhoneNum)
          var object = {
            type1: this.equipmentTypeValue || null,
            type2: this.RegularValue,
            make: this.MakeValue,
            model: this.ModelValue,
            email: this.$root.$data.store.state.activeCustomer.email,
            tUpRepExp: this.TuneValue,
            jobNumber: 1001,
            customerNotes: this.notesValue,
            cellPhone: this.selectedPhoneNum,
            customerId: this.$root.$data.store.state.activeCustomer._id,
            jobStatus: this.jobStatus,
            whereAmI: this.whereAmI
          }
          this.$root.store.state.activeJob = object
          this.confirm = true
        }
        else if (this.activePhone != '' && !Array.isArray(this.activePhone)) {
          console.log(this.activePhone)
          var object = {
            type1: this.equipmentTypeValue || null,
            type2: this.RegularValue,
            make: this.MakeValue,
            model: this.ModelName,
            email: this.$root.$data.store.state.activeCustomer.email,
            tUpRepExp: this.TuneValue,
            jobNumber: 1001,
            customerNotes: this.notesValue,
            cellPhone: this.activePhone,
            customerId: this.$root.$data.store.state.activeCustomer._id,
            jobStatus: this.jobStatus,
            whereAmI: this.whereAmI
          }
          this.$root.store.state.activeJob = object
          this.confirm = true
        }
        else if (this.activePhone.length == 1) {
          console.log(this.activePhone)
          var object = {
            type1: this.equipmentTypeValue || null,
            type2: this.RegularValue,
            make: this.MakeValue,
            model: this.ModelValue,
            email: this.$root.$data.store.state.activeCustomer.email,
            tUpRepExp: this.TuneValue,
            jobNumber: 1001,
            customerNotes: this.notesValue,
            cellPhone: this.activePhone[0],
            customerId: this.$root.$data.store.state.activeCustomer._id,
            jobStatus: this.jobStatus,
            whereAmI: this.whereAmI
          }
          this.$root.store.state.activeJob = object
          this.confirm = true
        }
        else {
          Materialize.toast('Please Select Phone Number', 4000)
        }
      },
      returnSelection: function () {
        if (this.activePhone != '' && !Array.isArray(this.activePhone)) {
          var object = {
            type1: this.equipmentTypeValue || null,
            type2: this.RegularValue,
            make: this.MakeValue,
            model: this.ModelValue,
            email: this.$root.$data.store.state.activeCustomer.email,
            tUpRepExp: this.TuneValue,
            jobNumber: 1001,
            customerNotes: this.notesValue,
            cellPhone: this.activePhone,
            customerId: this.$root.$data.store.state.activeCustomer._id,
            jobStatus: this.jobStatus,
            whereAmI: this.whereAmI
          }
          this.$root.store.state.activeJob = object
          this.confirm = false
          this.$root.$data.store.actions.postJob(object)
          this.$router.push('/home')
        } else if (this.selectedPhoneNum != null) {
          var object = {
            type1: this.equipmentTypeValue || null,
            type2: this.RegularValue,
            make: this.MakeValue,
            model: this.ModelValue,
            email: this.$root.$data.store.state.activeCustomer.email,
            tUpRepExp: this.TuneValue,
            jobNumber: 1001,
            customerNotes: this.notesValue,
            cellPhone: this.selectedPhoneNum,
            customerId: this.$root.$data.store.state.activeCustomer._id,
            jobStatus: this.jobStatus,
            whereAmI: this.whereAmI
          }
          this.confirm = false
          this.$root.$data.store.actions.postJob(object)
          this.$router.push('/home')
        }
        else if (this.activePhone.length == 1) {
          console.log(this.activePhone)
          var object = {
            type1: this.equipmentTypeValue || null,
            type2: this.RegularValue,
            make: this.MakeValue,
            model: this.ModelValue,
            email: this.$root.$data.store.state.activeCustomer.email,
            tUpRepExp: this.TuneValue,
            jobNumber: 1001,
            customerNotes: this.notesValue,
            cellPhone: this.activePhone[0],
            customerId: this.$root.$data.store.state.activeCustomer._id,
            jobStatus: this.jobStatus,
            whereAmI: this.whereAmI
          }
          this.confirm = false
          this.$root.$data.store.actions.postJob(object)
          this.$router.push('/home')
        } else {
          Materialize.toast('Please Select Phone Number', 4000)
        }
      },
      returnSelectionNew: function () {
        this.confirm = false
        $(document).ready(() => {
          $('.service-request .dropdown-button').dropdown()
          console.log(document.getElementById("btn01"))
          if (this.activePhone != '' && !Array.isArray(this.activePhone)) {
            console.log('here')
            var object = {
              type1: this.equipmentTypeValue,
              type2: this.RegularValue,
              make: this.MakeValue,
              model: this.ModelValue,
              email: this.$root.$data.store.state.activeCustomer.email,
              tUpRepExp: this.TuneValue,
              jobNumber: 1001,
              customerNotes: this.notesValue,
              cellPhone: this.activePhone,
              customerId: this.$root.$data.store.state.activeCustomer._id,
              jobStatus: this.jobStatus,
              whereAmI: this.whereAmI
            }
            this.confirm = false
            this.$root.$data.store.actions.postJob(object)
            this.showExpressButton = false
            this.showSubmitButton = false
            this.notesValue = ''
            this.ModelValue = ''
            this.TuneValue = ''
            this.resetAButton()
            this.resetBButton()
            this.resetCButton()
          } else if (this.selectedPhoneNum != null) {
            var object = {
              type1: this.equipmentTypeValue,
              type2: this.RegularValue,
              make: this.MakeValue,
              model: this.ModelValue,
              email: this.$root.$data.store.state.activeCustomer.email,
              tUpRepExp: this.TuneValue,
              jobNumber: 1001,
              customerNotes: this.notesValue,
              cellPhone: this.selectedPhoneNum,
              customerId: this.$root.$data.store.state.activeCustomer._id,
              jobStatus: this.jobStatus,
              whereAmI: this.whereAmI
            }
            this.confirm = false
            this.$root.$data.store.actions.postJob(object)
            this.showExpressButton = false
            this.showSubmitButton = false
            this.notesValue = ''
            this.ModelValue = ''
            this.TuneValue = ''
            this.resetAButton()
            this.resetBButton()
            this.resetCButton()
          }
          else if (this.activePhone.length == 1) {
            console.log(this.activePhone)
            var object = {
              type1: this.equipmentTypeValue,
              type2: this.RegularValue,
              make: this.MakeValue,
              model: this.ModelValue,
              email: this.$root.$data.store.state.activeCustomer.email,
              tUpRepExp: this.TuneValue,
              jobNumber: 1001,
              customerNotes: this.notesValue,
              cellPhone: this.activePhone[0],
              customerId: this.$root.$data.store.state.activeCustomer._id,
              jobStatus: this.jobStatus,
              whereAmI: this.whereAmI
            }
            this.confirm = false
            this.$root.$data.store.actions.postJob(object)
            this.showExpressButton = false
            this.showSubmitButton = false
            this.notesValue = ''
            this.ModelValue = ''
            this.TuneValue = ''
            this.resetAButton()
            this.resetBButton()
            this.resetCButton()
            this.showButtons()
          } else {
            Materialize.toast('Please Select Phone Number', 4000)
          }
        })
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
      resetAButton: function () {
        console.log("Reseting the selections made on the A button.")
        //grab the button element from the dom 
        var dom_but01 = document.getElementById("btn01")
        //Set it to red
        dom_but01.setAttribute('class', 'dropdown-button btn red')
        //Indicate it is not red - must be green for submit button to show 
        this.equipmentTypeGreen = false
        //Change the name on the button back to MAKE.
        dom_but01.innerText = "Equipment Type";
      },
      resetBButton: function () {
        this.showOther = false
        //grab the button element from the dom 
        var dom_but02 = document.getElementById("btn02")
        //Set it to red
        dom_but02.setAttribute('class', 'dropdown-button btn red')
        //Indicate it is not red - must be green for submit button to show 
        this.MakeGreen = false
        //Change the name on the button back to MAKE.
        dom_but02.innerText = "MAKE";
      },
      resetCButton: function () {
        console.log("Reseting the selections made on the C button.")
        //grab the button element from the dom 
        var dom_but03 = document.getElementById("btn03")
        console.log(dom_but03)
        //Set it to red
        dom_but03.setAttribute('class', 'dropdown-button btn red')
        //Indicate it is not red - must be green for submit button to show 
        this.TuneGreen = false
        //Change the name on the button back to MAKE.
        dom_but03.innerText = "TUNE/Repair";
      },
      resetDButton: function () {
        console.log("Reseting the selections made on the D button.")
        //grab the button element from the dom 
        var btn04 = document.getElementById("btn04")
        console.log(btn04)
        //Set it to red
        btn04.setAttribute('class', 'dropdown-button btn red')
        //Indicate it is not red - must be green for submit button to show 
        this.Regular = false
        //Change the name on the button back to Regular.
        btn04.innerText = "Regular";
      },
    },
  }

</script>
<style scoped>
  select {
    display: block !important;
  }
  
  h4 {
    color: black
  }
  
  b {
    color: white
  }
  
  .input-field label.selectLabel {
    position: relative;
    top: 0;
  }
  
  .placeholder {
    font-size: 36px
  }
  
  .validate {
    font-size: 36px
  }
  
  #telephone {
    font-size: 36px;
    text-align: center;
  }
  
   ::-webkit-input-placeholder {
    /*font-size: 36px;*/
    color: #d0cdfa;
    text-transform: uppercase;
    text-transform: uppercase;
    text-align: left;
  }
  
  input {
    text-align: center;
  }
</style>