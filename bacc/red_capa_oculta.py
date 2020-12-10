import numpy as np

np.random.seed(1)

def layer_sizes(X,Y):
    #Parámetros:
        #X:Datos de entrada de dimensiones (nx,m)
        #Y: Datos de salida de dimensiones (1,m)
    #Retorna:
        #n_x:Tamaño de la capa de entrada
        #n_h:Tamaño de la capa de salida
        #n_y:Tamaño de la capa oculta

    n_x=X.shape[0]
    n_h=3 #Este es un hiperparámetro
    n_y=Y.shape[0]

    return n_x, n_h, n_y

#n_x, n_h, n_y = layer_sizes(x,y)
#print(n_x, n_h, n_y)

def initialize(n_x, n_h, n_y):

    W1=np.random.randn(n_h,n_x)*0.01
    b1=np.zeros((n_h,1))
    W2=np.random.randn(n_y,n_h)*0.01
    b2=np.zeros((n_y,1))

    parameters={"W1":W1,
                "b1":b1,
                "W2":W2,
                "b2":b2}
    return parameters

#m
#print(m["W1"])

def sigmoid(Z):
    s = 1/(1+np.exp(-Z))
    return s

#print(sigmoid(0.5))

def forward_propagation(X,parameters):
    #Parámetros:
        #X: Dataset con los valores de entrada
        #Parameters:Diccionario de python con los pesos
    #Retorna:
        #A2: Vector con las predicciones del calculo
        #Cache: Diccionario con todos los valores Z1, A1, Z2 y A2

    W1=parameters["W1"]
    b1=parameters["b1"]
    W2=parameters["W2"]
    b2=parameters["b2"]

    Z1=np.dot(W1,X)+b1
    A1=np.tanh(Z1)
    Z2=np.dot(W2,A1)+b2
    A2=sigmoid(Z2)

    cache={"Z1":Z1,
           "A1":A1,
           "Z2":Z2,
           "A2":A2}

    return A2, cache


def compute_cost(A2,Y):
    #Parámetros:
        #A2:Vector que contiene todas las predicciones
        #Y:Vector que contiene todas las etiquetas a cada predicción
    #Retorna:
        #cost:Vector que contiene el costo del dataset,
        # se puede volver porcentual con np.means
    m=Y.shape[1]
    cost = (-1/m)*(np.sum(Y*np.log(A2)+(1-Y)*np.log(1-A2)))
    cost = np.squeeze(cost)
    return cost

def backward_propagation(parameters,cache,X,Y):

    #Parámetros:
        #parameters: Diccionario de python con los pesos W1, b1, W2, b2
        #cache: Diccionario de python con los valores de Z1, A1, Z2, A2
        #X: Input data
        #Y: Etiquetas con 1/0 para cada input data
    #Retorna:
        #grads: Diccionario de python con los valores de las derivadas de W1, b1, W2 y b2

    m=Y.shape[1]

    W1=parameters["W1"]
    b1=parameters["b1"]
    W2=parameters["W2"]
    b2=parameters["b2"]

    A1=cache["A1"]
    A2=cache["A2"]

    dz2=A2-Y
    dW2=(1/m)*np.dot(dz2,A1.T)
    db2=(1/m)*np.sum(dz2,axis=1,keepdims=True)
    dz1=np.dot(W2.T,dz2)*(1-np.power(A1,2))
    dW1=(1/m)*np.dot(dz1,X.T)
    db1=(1/m)*np.sum(dz1,axis=1,keepdims=True)

    grads={"dW1":dW1,
           "db1":db1,
           "dW2":dW2,
           "db2":db2}

    return grads

def update_parameters(parameters,grads,learning_rate):

    #Parámetros:
        #parameters: Diccionario de python con los pesos W1, b1, W2 y b2
        #grads: Diccionario de python con las derivadas de W1, b1, W2 y b2
        #learning_rate: Hiperparámetro para determinar la taza de parendizaje
    #Retorna:
        #parameters: El mismo diccionario de entrada pero con los valores actualizados

    W1=parameters["W1"]
    b1=parameters["b1"]
    W2=parameters["W2"]
    b2=parameters["b2"]

    dW1=grads["dW1"]
    db1=grads["db1"]
    dW2=grads["dW2"]
    db2=grads["db2"]

    W1=W1 - dW1*learning_rate
    b1=b1 - db1*learning_rate
    W2=W2 - dW2*learning_rate
    b2=b2 - db2*learning_rate

    parameters={"W1":W1,
                "b1":b1,
                "W2":W2,
                "b2":b2}

    return parameters

def nn_model(X, Y, n_h, num_iterations, learning_rate, print_cost=False):

    #Parámetros:
        #X: Dataset de entrada de tamaño (nx,m)
        #Y: Etiquetas del dataset de tamaño (1,m)
        #n_h: Tamaño de la capa oculta
        #num_iterations: Numero de veces que se va a entrenar el modelo
        #learning_rate: Hiperparámetro que define la velocidad de aprendizaje del modelo
        #print_cost: Si es positivo imprime el costo cada 1000 iteraciones
    #Retorna
        #parameters: Diccioanrio de python con los pesos finales del modelo para ponerlo a prueba

    #Este es el paso 1
    n_x=layer_sizes(X,Y)[0]
    n_y=layer_sizes(X,Y)[2]

    #Este es el paso 2
    parameters=initialize(n_x,n_h,n_y)
    costs = []
    its = []
    #Aqui empieza el paso 3

    for i in range(0,num_iterations):

        #Paso 3.1
        A2,cache=forward_propagation(X,parameters)

        #Paso 3.2
        cost=compute_cost(A2,Y)

        #Paso 3.3
        grads=backward_propagation(parameters,cache,X,Y)

        #Paso 3.4
        parameters=update_parameters(parameters,grads,learning_rate)

        #Aqui imprime el costo actual si el parámetro print_cost es verdadero
        if (print_cost and i%500==0):
            print ("Cost after iteration %i: %f" %(i,cost))
        if i%500 == 0:
            costs.append(cost)
            its.append(i)
        
    return parameters, its, costs

#full_parameters, its, costs=nn_model(x, y, 3, 15001, 0.05, True)

def predict(parameters,X):

    #Parámetros:
        #parameters: Diccionario de python con los pesos finales
        #X: Valores de entrada
    #Retorna:
        #predictions: Vector con todas las predicciones

    A2, cache = forward_propagation(X,parameters)

    predictions=(A2>0.5)

    return predictions

#x2=np.array([[1,0]])
#x2=x2.T

#predictions=predict(full_parameters,x2)

#print(predictions)

def train(red):
    if red == "OR":
        #Or
        x=np.array([[1,1],[0,0],[0,1],[1,0],[0,0],[1,0],[1,0],[1,1],[1,1],[0,0]])
        x=x.T
        print(x.shape)
        y=np.array([1,0,1,1,0,1,1,1,1,0],ndmin=2)
        print(y.shape)
        full_parameters, its, costs=nn_model(x, y, 3, 15001, 0.05, True)
        return full_parameters, its, costs
    elif red == "AND":
        #And
        x=np.array([[1,1],[0,0],[0,1],[1,0],[1,1],[1,1],[1,0],[0,0],[1,0],[1,1]])
        x=x.T
        print(x.shape)
        y=np.array([1,0,0,0,1,1,0,0,0,1],ndmin=2)
        print(y.shape)
        full_parameters, its, costs=nn_model(x, y, 3, 15001, 0.05, True)
        return full_parameters, its, costs
    elif red == "XOR":
        #XOR
        x=np.array([[1,1],[0,0],[0,1],[1,0],[1,1],[1,1],[1,0],[0,0],[1,0],[1,1]])
        x=x.T
        print(x.shape)
        y=np.array([0,0,1,1,0,0,1,0,1,0],ndmin=2)
        print(y.shape)
        full_parameters, its, costs=nn_model(x, y, 3, 15001, 0.05, True)
        return full_parameters, its, costs
    elif red == "SUMA":
        #Suma de numeros
        x=np.array([[1,2],[-1,-2],[1,2],[-2,-3],[0.3,0.5],[-1,-2.2],[-1,-1.2],[0.1,1],[3,0.5],[-3,-4]])
        x=x.T
        print(x.shape)
        y=np.array([1,0,1,0,1,0,0,1,1,0],ndmin=2)
        print(y.shape)
        full_parameters, its, costs=nn_model(x, y, 3, 15001, 0.05, True)
        return full_parameters, its, costs

def main(red, bol, parameters, entrada):
    if bol:
        full_parameters, its, costs = train(red)
        return full_parameters, its, costs
    else:
        prediction = predict(parameters,entrada)
        return prediction
    
if __name__ == "__main__":
    main("XOR")