import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Star, Clock, Wheat } from 'lucide-react';

// Tipos de datos
interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  disponible: boolean;
  tiempoPreparacion: string;
  ingredientes: string[];
  rating: number;
  esEspecialidad: boolean;
}

// Datos de ejemplo para la panadería
const productosData: Producto[] = [
  {
    id: 1,
    nombre: "Pan de Campo",
    descripcion: "Pan artesanal con masa madre, corteza crujiente y miga esponjosa",
    precio: 2500,
    categoria: "Panes",
    imagen: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop",
    disponible: true,
    tiempoPreparacion: "30 min",
    ingredientes: ["Harina integral", "Masa madre", "Sal marina", "Agua"],
    rating: 4.8,
    esEspecialidad: true
  },
  {
    id: 2,
    nombre: "Croissant de Mantequilla",
    descripcion: "Croissant hojaldrado con mantequilla francesa, dorado y crujiente",
    precio: 1800,
    categoria: "Bollería",
    imagen: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    disponible: true,
    tiempoPreparacion: "15 min",
    ingredientes: ["Harina", "Mantequilla francesa", "Levadura", "Huevo"],
    rating: 4.9,
    esEspecialidad: false
  },
  {
    id: 3,
    nombre: "Torta Tres Leches",
    descripcion: "Esponjoso bizcocho bañado en tres leches con canela",
    precio: 18000,
    categoria: "Tortas",
    imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    disponible: true,
    tiempoPreparacion: "45 min",
    ingredientes: ["Leche condensada", "Leche evaporada", "Crema", "Bizcocho"],
    rating: 4.7,
    esEspecialidad: true
  },
  {
    id: 4,
    nombre: "Empanadas de Pino",
    descripcion: "Empanadas tradicionales chilenas rellenas de carne, cebolla y huevo",
    precio: 2200,
    categoria: "Salados",
    imagen: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    disponible: true,
    tiempoPreparacion: "20 min",
    ingredientes: ["Carne molida", "Cebolla", "Huevo duro", "Aceitunas"],
    rating: 4.6,
    esEspecialidad: false
  },
  {
    id: 5,
    nombre: "Marraqueta",
    descripcion: "Pan tradicional chileno, crujiente por fuera y suave por dentro",
    precio: 800,
    categoria: "Panes",
    imagen: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop",
    disponible: true,
    tiempoPreparacion: "10 min",
    ingredientes: ["Harina", "Agua", "Levadura", "Sal"],
    rating: 4.5,
    esEspecialidad: false
  },
  {
    id: 6,
    nombre: "Sopaipillas",
    descripcion: "Sopaipillas caseras servidas con pebre o chancaca",
    precio: 1500,
    categoria: "Dulces",
    imagen: "https://images.unsplash.com/photo-1619985632461-4618bb8b639b?w=400&h=300&fit=crop",
    disponible: false,
    tiempoPreparacion: "25 min",
    ingredientes: ["Zapallo", "Harina", "Aceite", "Levadura"],
    rating: 4.4,
    esEspecialidad: true
  }
];

const categorias = ["Todos", "Panes", "Bollería", "Tortas", "Salados", "Dulces"];

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>(productosData);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>(productosData);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("Todos");
  const [busqueda, setBusqueda] = useState<string>("");
  const [mostrarFiltros, setMostrarFiltros] = useState<boolean>(false);
  const [soloDisponibles, setSoloDisponibles] = useState<boolean>(false);
  const [soloEspecialidades, setSoloEspecialidades] = useState<boolean>(false);

  useEffect(() => {
    let productosFiltrados = productos;

    if (categoriaSeleccionada !== "Todos") {
      productosFiltrados = productosFiltrados.filter(
        producto => producto.categoria === categoriaSeleccionada
      );
    }

    if (busqueda.trim() !== "") {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    if (soloDisponibles) {
      productosFiltrados = productosFiltrados.filter(producto => producto.disponible);
    }

    if (soloEspecialidades) {
      productosFiltrados = productosFiltrados.filter(producto => producto.esEspecialidad);
    }

    setProductosFiltrados(productosFiltrados);
  }, [productos, categoriaSeleccionada, busqueda, soloDisponibles, soloEspecialidades]);

  const formatearPrecio = (precio: number): string => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  const renderEstrellas = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Nuestros Productos
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Descubre nuestra selección de productos artesanales, elaborados con amor y los mejores ingredientes
          </p>
          <div className="flex items-center justify-center mt-4">
            <Wheat className="w-6 h-6 text-amber-600 mr-2" />
            <span className="text-amber-600 font-medium">Horneado fresco todos los días</span>
          </div>
        </div>

        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="flex items-center gap-2 px-4 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>
          </div>

          {mostrarFiltros && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Categorías</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorias.map((categoria) => (
                      <button
                        key={categoria}
                        onClick={() => setCategoriaSeleccionada(categoria)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          categoriaSeleccionada === categoria
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {categoria}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Disponibilidad</h3>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={soloDisponibles}
                      onChange={(e) => setSoloDisponibles(e.target.checked)}
                      className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-sm text-gray-600">Solo disponibles</span>
                  </label>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Especialidades</h3>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={soloEspecialidades}
                      onChange={(e) => setSoloEspecialidades(e.target.checked)}
                      className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-sm text-gray-600">Solo especialidades</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {productosFiltrados.length} de {productos.length} productos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-48 object-cover"
                />
                
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {producto.esEspecialidad && (
                    <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Especialidad
                    </span>
                  )}
                  {!producto.disponible && (
                    <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Agotado
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {producto.tiempoPreparacion}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {producto.nombre}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {producto.descripcion}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {renderEstrellas(producto.rating)}
                  </div>
                  <span className="text-sm text-gray-500">({producto.rating})</span>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Ingredientes principales:</p>
                  <div className="flex flex-wrap gap-1">
                    {producto.ingredientes.slice(0, 3).map((ingrediente, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {ingrediente}
                      </span>
                    ))}
                    {producto.ingredientes.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{producto.ingredientes.length - 3} más
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-600">
                    {formatearPrecio(producto.precio)}
                  </span>
                  
                  <button
                    disabled={!producto.disponible}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                      producto.disponible
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {producto.disponible ? 'Agregar' : 'Agotado'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-500">
              Intenta ajustar los filtros o buscar con otros términos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productos;