from flask import Flask, jsonify, request
from flask_cors import CORS
import red_capa_oculta as capa

full_parameters = None #Parametros de la red neuronal entrenada

app = Flask(__name__) #Servidor con flask
app.config['SECRET_KEY'] = 'secret!' 
CORS(app) #Habilitar Cross Origin Resource Sharing usando una extensión de Flask para permitir el envío de peticiones

#<string:red_neuronal> es la variable que le llega al servidor, en este caso, puede ser "OR", "AND", "XOR" o "SUMA"
@app.route('/<string:red_neuronal>', methods=['GET']) #Metodo GET
def redneuronal(red_neuronal):
    #Entrar la red neuronal dependiendo de la variable que le llega al servidor
    full_parameters, its, costs=capa.main(red_neuronal,1,None) 
    
    #Preparar la respuesta del servidor (en este caso, dos arreglos representando el costo
    #y las iteraciones de la red neuronal entrenada) para enviar al front
    response = jsonify({
        "iterations" : its,
        "costs" : costs,
    }) 
    #print(response)
    return response

@app.route('/predecir', methods=['POST'])
def predecir():
    print (request.json)
    return prediccion

if __name__ == '__main__':
    app.run(debug=True, port=5000)

