var online = new Vue({
  el: '#demo',
  data: {
      video: '',
      annotation: [
       // { partie: 'Intro' , duree: '0:00'},
       //{ partie: 'Partie 1'  , duree: '0:35'},
       // { partie: 'Partie 2'  , duree: '0:43'},
       // { partie: 'Partie 3'  , duree: '1:00'},
      ],
      color: '#2cb3ec',

      styleObject: {
        color: '#2cb3ec',
        fontSize: '17px',
        width: '49%',
      },
      partie : [],
      duree : [],
      
  },

methods: {

    load: async function(){
      const {value: file} = await Swal.fire({
        title: 'Choisir une video',
        input: 'file',
        inputAttributes: {
          'accept': 'video/*',
          'aria-label': 'Chargement de votre video'
        }
      })
      
      if (file) {
       
        const reader = new FileReader
        reader.onload = (e) => {
          Swal.fire({
            title: 'Votre video',
          })
        }

        // On charge la video   
        var videoNode = document.querySelector('video')
        videoNode.src=URL.createObjectURL(file)

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        
        Toast.fire({
          type: 'success',
          title: 'Video ajoutée'
        })

        
      }
  },
  
  annoter: async function(){
    const {value: txt} = await Swal.fire({
      title: 'Entrez nom de la partie',
      input: 'text',
      inputPlaceholder: 'Nom'
    })
    
    if (txt) {
      const {value: text1} = Swal.fire({
        title: 'Entrez la durée de cette partie',
        input: 'text',
        inputPlaceholder: 'Format 00:00'
      })
      .then((result) => {
        Swal.fire(text1)
        this.annotation.push({ partie: txt, duree: text1 })
      })
    }   
    
  },

  annoter2: async function(){
    const {value: formValues} = await Swal.fire({
      title: 'Entrer nom de la partie et durée',
      html:
        '<input id="swal-input1" class="swal2-input">' +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    })

    this.annotation.push({ 
      partie: document.getElementById('swal-input1').value,
      duree: document.getElementById('swal-input2').value
    })
    

    //On stock les infos saisi par l'utilisateur dans le localstorage
    localPartie='partie'+this.partie.length
    console.log(localPartie)

    localDuree='duree'+this.duree.length
    console.log(localDuree)



    this.partie.push(localPartie)
    this.duree.push(localDuree)

    inputPartie=document.getElementById('swal-input1').value,
    inputDuree=document.getElementById('swal-input2').value

    taille=localStorage.getItem('taille')
    taille++
    localStorage.setItem('taille',taille)
    console.log(taille)

    localStorage.setItem(localPartie, inputPartie)
    localStorage.setItem(localDuree, inputDuree)
    
    //this.loaddata()
  
    // CHangement dynamique de la barre video
    this.styleObject.width=Math.round(95/this.annotation.length)+'%'

    console.log(this.partie[0])
  },

  annoterModify: async function(annotation,index){ //modify
    const {value: formValues} = await Swal.fire({
      title: 'Entrer nom de la partie et durée',
      html:
        '<input id="swal-input1" class="swal2-input" value="'+annotation.partie+'">' +
        '<input id="swal-input2" class="swal2-input" value="'+annotation.duree+'">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    })

    


    this.annotation[index].partie= document.getElementById('swal-input1').value,
    this.annotation[index].duree= document.getElementById('swal-input2').value

    //On stock les infos saisi par l'utilisateur dans le localstorage
    localPartie='partie'+index
    console.log(localPartie)

    localDuree='duree'+index
    console.log(localDuree)

    inputPartie=document.getElementById('swal-input1').value,
    inputDuree=document.getElementById('swal-input2').value

    localStorage.setItem(localPartie, inputPartie)
    localStorage.setItem(localDuree, inputDuree)

  },

  loaddata: function(){
    tailleItem=localStorage.getItem('taille')
    console.log(tailleItem)
    j=0
    while (tailleItem>j && tailleItem >0){
      partieActuelle="partie"+j
      dureeActuelle="duree"+j
      localPartie=localStorage.getItem(partieActuelle)
      localDuree=localStorage.getItem(dureeActuelle)

      console.log(this.partie[j])
      console.log(localPartie)

      console.log(this.duree[j])
      console.log(localDuree)

      this.annotation.push({ 
        partie: localPartie,
        duree: localDuree
      })
      j++

      // CHangement dynamique de la barre video
    this.styleObject.width=Math.round(95/this.annotation.length)+'%'
    }
  },

  // Synchroniser le sommaire avec la video
  sync: function(){
    location.reload();
  },

  // Supprime tous les donnes saisies
  clear: function(){
    localStorage.clear()
    this.annotation=[]

    var videoNode = document.querySelector('video')
    videoNode.src=""
  },
  
  test: function(partie){
        console.log('Titre : ' + partie.partie + ' - Durée : ' + partie.duree)
  }

},

created: function(){

  this.loaddata()
  },

})  



