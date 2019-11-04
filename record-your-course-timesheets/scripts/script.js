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
          this.video = URL.createObjectURL(file)
          var videoNode = document.querySelector('video')
          var fileURL = URL.createObjectURL(file)
          videoNode.src = fileURL
          this.video=videoNode.src

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
      

      //On stock les infos saisi par l'utilisateur ds le localstorage
      p='partie'+this.partie.length
      console.log(p)

      d='duree'+this.duree.length
      console.log(d)



      this.partie.push(p)
      this.duree.push(d)

      p1=document.getElementById('swal-input1').value,
      d1=document.getElementById('swal-input2').value

      taille=localStorage.getItem('taille')
      taille++
      localStorage.setItem('taille',taille)
      console.log(taille)

      localStorage.setItem(p, p1)
      localStorage.setItem(d, d1)
      
      //this.loaddata()
    
      // CHangement dynamique de la barre video
      this.styleObject.width=Math.round(95/this.annotation.length)+'%'

      console.log(this.partie[0])
    },

    loaddata: function(){
      i=localStorage.getItem('taille')
      console.log(i)
      j=0
      while (i>j && i >0){
        a="partie"+j
        b="duree"+j
        p=localStorage.getItem(a)
        d=localStorage.getItem(b)

        console.log(this.partie[j])
        console.log(p)

        console.log(this.duree[j])
        console.log(d)

        this.annotation.push({ 
          partie: p,
          duree: d
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
    }

  },

  created: function(){

    this.loaddata()
    },
  
  })  
  

  
