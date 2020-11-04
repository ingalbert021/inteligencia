   "use strict"



        let clasificador;
            let video;
            function setup() {
                noCanvas(320, 240);
                // Inicializa la camara
                video = createCapture(VIDEO);

                video.size(320, 240);
              
                // Inicializa le clasificador de imagenes con el video
                clasificador = ml5.imageClassifier('MobileNet', video, modeloListo);
            }
            //Cuando el modelo este listo
            function modeloListo() {
                // Cambiamos el estado a Modelo cargado
                select('#estado').html('Modelo cargado');
                // Llama al la funcion para comenzar a clasificar el video
                clasificarVideo();
            }
            // Predecimos que imagen es la que se muestra en el video
            function clasificarVideo() {
                clasificador.predict(tomaResultado);
            }
            // Cuando obtenemos el resultado
            function tomaResultado(err, resultado) {
                console.log(resultado);
                // Escribimos el nombre de la imagen detectada
                select('#resultado').html(resultado[0].className);
                select('#probabilidad').html(nf(resultado[0].probability, 0, 2));
                // Llamamos de nuevo al clasificador
                clasificarVideo();
            }

