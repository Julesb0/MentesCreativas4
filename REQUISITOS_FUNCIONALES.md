# Requisitos Funcionales - Mentes Creativas

**Institución**: Colegio Mentes Creativas  
**Grados**: 4° y 5° de primaria  
**Fecha**: Noviembre 2025  
**Objetivo General**: Incorporar recursos multimedia (audio, video, gráficos 3D) que favorezcan el aprendizaje lúdico en matemáticas, ciencias naturales y pensamiento lógico.

---

## 1. TEMA 1: SISTEMA SOLAR (Ciencias Naturales)

### 1.1 Descripción
Experiencia interactiva 3D que permite a los estudiantes explorar el Sistema Solar, comprender órbitas planetarias, características físicas de planetas y fenómenos astronómicos.

### 1.2 Requerimientos Funcionales

#### RF1.1 - Visualización 3D del Sistema Solar
- **Descripción**: El sistema debe renderizar una representación 3D del Sistema Solar con el Sol y 8 planetas.
- **Criterios de Aceptación**:
  - El Sol debe estar en el centro con tamaño proporcional
  - Los 8 planetas deben orbitar con velocidades realistas
  - Los planetas deben tener colores distintivos según su composición
  - La visualización debe ser suave a 60 FPS mínimo

#### RF1.2 - Interactividad de Selección de Planetas
- **Descripción**: El usuario puede hacer clic en un planeta para ver información detallada.
- **Criterios de Aceptación**:
  - El planeta seleccionado debe escalarse visualmente (1.2x)
  - Se debe mostrar información en panel lateral: radio, duración año/día, atmósfera, gravedad
  - El cambio de selección debe ser inmediato
  - Debe funcionar en dispositivos táctiles

#### RF1.3 - Panel Informativo Dinámico
- **Descripción**: Mostrar datos calculados del planeta seleccionado.
- **Criterios de Aceptación**:
  - Volumen planetario: cálculo matemático (4/3 × π × r³)
  - Duración orbital en días terrestres
  - Duración rotación (día planetario)
  - Temperatura promedio y composición atmosférica

#### RF1.4 - Quiz Interactivo
- **Descripción**: Preguntas de opción múltiple (A/B/C) sobre características planetarias.
- **Criterios de Aceptación**:
  - Mínimo 3 preguntas específicas por planeta
  - Feedback inmediato: respuesta correcta/incorrecta
  - Explicación científica de la respuesta correcta
  - Puntuación acumulativa

#### RF1.5 - Controles de Cámara
- **Descripción**: El usuario puede orbitar alrededor del Sistema Solar para diferentes perspectivas.
- **Criterios de Aceptación**:
  - Rotación suave sin puntos muertos
  - Zoom in/out fluido (rango: 12-80 unidades)
  - Restricción de ángulos para evitar inversión (±82°)

---

## 2. TEMA 2: FORMAS GEOMÉTRICAS 3D (Matemáticas)

### 2.1 Descripción
Simulador interactivo de formas geométricas 3D (cubo, esfera, cilindro) que permite manipular dimensiones, calcular propiedades matemáticas y visualizar en tiempo real.

### 2.2 Requerimientos Funcionales

#### RF2.1 - Visualización de Formas 3D
- **Descripción**: Renderizar cubo, esfera y cilindro con texturas y sombras realistas.
- **Criterios de Aceptación**:
  - Cada forma debe poder rotarse independientemente
  - Sombras de contacto dinámicas en el suelo
  - Materiales reflectivos para mejor comprensión visual
  - Rotación continua suave (0.3-0.6 rad/s)

#### RF2.2 - Control de Dimensiones
- **Descripción**: Sliders para ajustar dimensiones de cada forma.
- **Criterios de Aceptación**:
  - Cubo: rango de arista 1-6 cm (paso 0.1)
  - Esfera: rango de radio 1-5 cm (paso 0.1)
  - Cilindro: radio 0.8-3 cm, altura 1.5-6 cm (paso 0.1)
  - Actualización en tiempo real (<50ms)
  - Validación de rangos (rechazo de valores inválidos)

#### RF2.3 - Cálculo Automático de Propiedades Matemáticas
- **Descripción**: Calcular y mostrar área superficial y volumen automáticamente.
- **Criterios de Aceptación**:
  - Cubo: A = 6a², V = a³
  - Esfera: A = 4πr², V = 4/3 × πr³
  - Cilindro: A = 2πr(h+r), V = πr²h
  - Precisión mínima: 2 decimales
  - Formato con separadores de miles (ej: 1.234,56)

#### RF2.4 - Modo Composición de Formas
- **Descripción**: Permitir visualizar múltiples formas simultáneamente en diferentes posiciones.
- **Criterios de Aceptación**:
  - Dos modos: Forma A (todas juntas) y Forma B (composición especial)
  - Botón "Formas Aleatorias" para randomizar dimensiones
  - Colores diferenciados por forma para claridad
  - Máximo 3 formas simultáneas

#### RF2.5 - Quiz de Geometría
- **Descripción**: Preguntas sobre relación entre dimensión y propiedades (área/volumen).
- **Criterios de Aceptación**:
  - Preguntas: "Si duplicas la arista, ¿cómo cambia el volumen?"
  - Respuestas múltiples (A/B/C)
  - Explicación matemática en feedback
  - Mínimo 3 preguntas variadas

#### RF2.6 - Controles de Cámara Personalizados
- **Descripción**: Botones para orbitar y hacer zoom específico.
- **Criterios de Aceptación**:
  - Botones: Girar ⟲, Girar ⟳, Acercar ＋, Alejar −
  - Cada click rota 0.2 radianes
  - Zoom varía factor 0.85-1.15 por click
  - Rango zoom: 4-20 unidades

---

## 3. TEMA 3: SIMETRÍA EN MARIPOSAS (Ciencias Naturales / Pensamiento Lógico)

### 3.1 Descripción
Laboratorio visual que explora la simetría bilateral en especies de mariposas, permite ajustar velocidad de aleteo y observar patrones naturales.

### 3.2 Requerimientos Funcionales

#### RF3.1 - Catálogo de Especies
- **Descripción**: Base de datos de 11 especies de mariposas con información específica.
- **Criterios de Aceptación**:
  - Mínimo 11 especies (Monarca, Morpho, Tigre Rayada, etc.)
  - Por especie: nombre, envergadura (cm), peso (mg), región, característica especial
  - Colores representativos de alas (3 colores mínimo)
  - Algunas especies con transparencia parcial (ej: Glasswing)

#### RF3.2 - Visualización 3D de Mariposa
- **Descripción**: Renderizar mariposa con cuerpo central y alas simétricas.
- **Criterios de Aceptación**:
  - Cuerpo cilíndrico central
  - Dos alas con simetría bilateral perfecta
  - Colores según especie seleccionada
  - Proporciones realistas (envergadura variable)

#### RF3.3 - Control de Velocidad de Aleteo
- **Descripción**: Slider para ajustar velocidad de movimiento de alas (0.5x - 6x).
- **Criterios de Aceptación**:
  - Rango: 0.5x a 6x velocidad normal
  - Paso: 0.1x
  - Movimiento simulado con función seno (onda suave)
  - Ángulo máximo de apertura: ±0.5 radianes

#### RF3.4 - Visualización del Eje de Simetría
- **Descripción**: Línea visible que muestra el eje de simetría bilateral.
- **Criterios de Aceptación**:
  - Línea vertical amarilla por defecto
  - Botón para mostrar/ocultar
  - Longitud: envergadura × 0.4
  - Color: #fef08a (amarillo brillante)

#### RF3.5 - Selección de Especies
- **Descripción**: Interfaz para cambiar entre las 11 especies disponibles.
- **Criterios de Aceptación**:
  - Botones/lista para cada especie
  - Visualización de colores de alas en miniatura
  - Cambio inmediato de visualización
  - Información de especie en panel lateral

#### RF3.6 - Ficha de Información Detallada
- **Descripción**: Panel lateral con información de la especie seleccionada.
- **Criterios de Aceptación**:
  - Nombre científico y común
  - Envergadura en cm (con 1 decimal)
  - Peso en miligramos
  - Región/hábitat
  - Nota curiosa (máximo 150 caracteres)

#### RF3.7 - Quiz sobre Mariposas y Simetría
- **Descripción**: Preguntas sobre características y simetría de mariposas.
- **Criterios de Aceptación**:
  - Preguntas tipo A/B (verdadero/falso o 2 opciones)
  - Ejemplos: "¿Dónde hiberna la Monarca?" "¿Qué genera el azul del Morpho?"
  - Mínimo 3 preguntas
  - Puntuación y feedback inmediato

---

## 4. REQUERIMIENTOS NO FUNCIONALES COMUNES

### RNF1 - Rendimiento
- Tiempo de carga inicial: < 3 segundos
- Frame rate mínimo: 60 FPS en dispositivos estándar
- Respuesta interactiva: < 100ms

### RNF2 - Compatibilidad
- Navegadores: Chrome, Firefox, Safari, Edge (versiones últimas 2)
- Dispositivos: Desktop, tablet, mobile
- Resoluciones: 320px - 2560px ancho

### RNF3 - Accesibilidad
- Contraste WCAG AA mínimo
- Navegación con teclado funcional
- Alt-text para imágenes
- Enlace "Saltar a contenido principal"

### RNF4 - Usabilidad
- Interfaz intuitiva sin necesidad de manual
- Feedback visual en todas las acciones
- Tiempo de aprendizaje: < 2 minutos
- Errores claros y constructivos

### RNF5 - Mantenibilidad
- Código TypeScript con tipos estrictos
- Componentes reutilizables
- Cobertura de pruebas unitarias: >= 70%
- Documentación de componentes

---

## 5. MATRIZ DE TRAZABILIDAD

| RF | Tema | Tipo | Prioridad | Estado |
|----|------|------|-----------|--------|
| RF1.1 | Sistema Solar | Core | Alta | Implementado |
| RF1.2 | Sistema Solar | Interactividad | Alta | Implementado |
| RF1.3 | Sistema Solar | Información | Media | Implementado |
| RF1.4 | Sistema Solar | Quiz | Media | Implementado |
| RF1.5 | Sistema Solar | Control | Baja | Implementado |
| RF2.1 | Formas 3D | Core | Alta | Implementado |
| RF2.2 | Formas 3D | Control | Alta | Implementado |
| RF2.3 | Formas 3D | Cálculo | Alta | Implementado |
| RF2.4 | Formas 3D | Composición | Media | Implementado |
| RF2.5 | Formas 3D | Quiz | Media | Implementado |
| RF2.6 | Formas 3D | Control | Baja | Implementado |
| RF3.1 | Mariposas | Datos | Alta | Implementado |
| RF3.2 | Mariposas | Core | Alta | Implementado |
| RF3.3 | Mariposas | Control | Alta | Implementado |
| RF3.4 | Mariposas | Visualización | Media | Implementado |
| RF3.5 | Mariposas | Selección | Alta | Implementado |
| RF3.6 | Mariposas | Información | Media | Implementado |
| RF3.7 | Mariposas | Quiz | Media | Implementado |

---

## 6. PLAN DE PRUEBAS

### Pruebas Unitarias
- Funciones de cálculo geométrico (área, volumen)
- Lógica de quiz (respuestas correctas)
- Validación de rangos de entrada

### Pruebas de Integración
- Flujo de navegación entre temas
- Cambio de tema y persistencia de estado
- Integración de componentes 3D con controles

### Pruebas de Sistema
- Todos los requerimientos funcionales (RF1.1-RF3.7)
- Rendimiento en múltiples navegadores
- Compatibilidad móvil/desktop

### Pruebas de Aceptación
- Usuario puede seleccionar tema desde menú
- Usuario puede visualizar contenido 3D
- Usuario puede responder quiz e ver resultados
- Usuario recibe feedback adecuado

