# 🧪 Plan Integral de Testing - 5 Niveles

**Proyecto**: Mentes Creativas 4  
**Versión**: 1.0  
**Público Objetivo**: Estudiantes 4°-5° grado  

---

## 📊 Estructura de Testing (Pirámide de Cohn)

```
                    🎭 Acceptance (Aceptación)
                        ↑
                      🖥️ System
                        ↑
                      🔗 Integration
                        ↑
                      🔬 Unit
```

---

## Nivel 1️⃣: **Unit Tests** (Pruebas Unitarias)

### 📍 Alcance
Probar funciones individuales aisladamente. Verificar cálculos matemáticos, lógica de validación.

### 🎯 Requisitos Cubiertos
- **RF2.3**: Cálculo correcto de área
- **RF2.4**: Cálculo correcto de volumen
- **RF1.4, RF2.6, RF3.7**: Validación de respuestas

### 📝 Casos de Test

#### Test Suite 1: Geometría (geometry.ts)
```javascript
// src/domains/shapes-3d/__tests__/geometry.test.ts

describe('Geometry - Shape Calculations', () => {
  describe('Cube', () => {
    test('calculates surface area correctly', () => {
      const area = calculateCubeArea(2);
      expect(area).toBe(24); // 6 * 2²
    });

    test('calculates volume correctly', () => {
      const volume = calculateCubeVolume(2);
      expect(volume).toBe(8); // 2³
    });

    test('handles edge case: side = 0', () => {
      expect(calculateCubeArea(0)).toBe(0);
      expect(calculateCubeVolume(0)).toBe(0);
    });
  });

  describe('Sphere', () => {
    test('calculates surface area correctly', () => {
      const area = calculateSphereArea(1);
      const expected = 4 * Math.PI; // 4πr²
      expect(Math.abs(area - expected)).toBeLessThan(0.01);
    });

    test('calculates volume correctly', () => {
      const volume = calculateSphereVolume(1);
      const expected = (4/3) * Math.PI; // (4/3)πr³
      expect(Math.abs(volume - expected)).toBeLessThan(0.01);
    });
  });

  describe('Cylinder', () => {
    test('calculates surface area correctly', () => {
      const area = calculateCylinderArea(1, 2);
      const expected = 2 * Math.PI + 2 * Math.PI * 1 * 2; // 2πr² + 2πrh
      expect(Math.abs(area - expected)).toBeLessThan(0.01);
    });

    test('calculates volume correctly', () => {
      const volume = calculateCylinderVolume(1, 2);
      const expected = Math.PI * 1 * 2; // πr²h
      expect(Math.abs(volume - expected)).toBeLessThan(0.01);
    });
  });
});
```

#### Test Suite 2: Quiz Logic
```javascript
// src/domains/__tests__/quiz.logic.test.ts

describe('Quiz Validation Logic', () => {
  test('validates correct answer', () => {
    const question = {
      id: 1,
      question: '¿Cuál es la fórmula del volumen de una esfera?',
      correctAnswer: 'V = (4/3)πr³'
    };
    
    const result = validateAnswer('V = (4/3)πr³', question.correctAnswer);
    expect(result).toBe(true);
  });

  test('rejects incorrect answer', () => {
    const question = {
      id: 1,
      correctAnswer: 'respuesta_correcta'
    };
    
    const result = validateAnswer('respuesta_incorrecta', question.correctAnswer);
    expect(result).toBe(false);
  });

  test('calculates score correctly', () => {
    const answers = [true, true, false]; // 2 de 3 correctas
    const score = calculateScore(answers);
    expect(score).toBe(67); // 2/3 = 66.67%
  });

  test('handles empty responses', () => {
    const answers = [];
    const score = calculateScore(answers);
    expect(score).toBe(0);
  });
});
```

### ✅ Ejecución
```bash
npm test -- --coverage --testPathPattern="geometry|quiz.logic"
```

**Cobertura Esperada**: > 90% para funciones críticas

---

## Nivel 2️⃣: **Integration Tests** (Pruebas de Integración)

### 📍 Alcance
Probar interacción entre componentes. Verificar flujos completos dentro de un dominio (Solar/Formas/Mariposas).

### 🎯 Requisitos Cubiertos
- **RF1.2**: Info panel + Planet selection
- **RF2.2**: Slider dimension + Area/Volume calculations
- **RF3.2**: Speed control + Animation update
- **RF1.3, RF2.5, RF3.6**: Component → Quiz flow

### 📝 Casos de Test

#### Test Suite: Solar System Integration
```javascript
// src/domains/solar-system/__tests__/solar.integration.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SolarSystemPage from '../pages/SolarSystemPage';

describe('Solar System - Integration', () => {
  test('selects planet and displays information', async () => {
    const user = userEvent.setup();
    render(<SolarSystemPage />);
    
    // Click on Mars
    const marsButton = screen.getByText('Marte');
    await user.click(marsButton);
    
    // Verify info panel shows Mars data
    await waitFor(() => {
      expect(screen.getByText(/Marte/i)).toBeInTheDocument();
      expect(screen.getByText(/distancia/i)).toBeInTheDocument();
    });
  });

  test('launches quiz after selecting planet', async () => {
    const user = userEvent.setup();
    render(<SolarSystemPage />);
    
    // Click Jupiter
    await user.click(screen.getByText('Júpiter'));
    
    // Click quiz button
    const quizButton = screen.getByRole('button', { name: /quiz/i });
    await user.click(quizButton);
    
    // Verify first question appears
    await waitFor(() => {
      expect(screen.getByText(/¿Cuál es/i)).toBeInTheDocument();
    });
  });

  test('answers quiz and shows score', async () => {
    const user = userEvent.setup();
    render(<SolarSystemPage />);
    
    await user.click(screen.getByText('Venus'));
    await user.click(screen.getByRole('button', { name: /quiz/i }));
    
    // Answer Q1
    await user.click(screen.getByRole('button', { name: 'respuesta_1' }));
    await user.click(screen.getByRole('button', { name: /siguiente/i }));
    
    // Answer Q2
    await user.click(screen.getByRole('button', { name: 'respuesta_2' }));
    await user.click(screen.getByRole('button', { name: /siguiente/i }));
    
    // Answer Q3
    await user.click(screen.getByRole('button', { name: 'respuesta_1' }));
    await user.click(screen.getByRole('button', { name: /terminar/i }));
    
    // Verify score displayed (2/3 = 67%)
    await waitFor(() => {
      expect(screen.getByText(/67%|67/)).toBeInTheDocument();
    });
  });
});
```

#### Test Suite: Shapes 3D Integration
```javascript
// src/domains/shapes-3d/__tests__/shapes.integration.test.tsx

describe('Shapes 3D - Integration', () => {
  test('adjusts cube dimensions and calculates area/volume', async () => {
    const user = userEvent.setup();
    render(<Shapes3DPage />);
    
    // Select Cube
    await user.click(screen.getByText('Cubo'));
    
    // Get initial values
    const areaInitial = screen.getByText(/Área:/);
    const volumeInitial = screen.getByText(/Volumen:/);
    
    // Adjust side slider to 3
    const slider = screen.getByRole('slider', { name: /lado/i });
    await user.clear(slider);
    await user.type(slider, '3');
    
    // Verify calculations updated
    // Area = 6 * 3² = 54
    // Volume = 3³ = 27
    await waitFor(() => {
      expect(screen.getByText(/54/)).toBeInTheDocument();
      expect(screen.getByText(/27/)).toBeInTheDocument();
    });
  });

  test('switches between shapes and recalculates', async () => {
    const user = userEvent.setup();
    render(<Shapes3DPage />);
    
    // Start with Cube
    await user.click(screen.getByText('Cubo'));
    let areaDisplay = screen.getByText(/Área:/);
    
    // Switch to Sphere
    await user.click(screen.getByText('Esfera'));
    
    // Area display should update with sphere formula
    await waitFor(() => {
      const sphereArea = screen.getByText(/Área:/);
      expect(sphereArea).toBeInTheDocument();
    });
  });
});
```

### ✅ Ejecución
```bash
npm test -- --testPathPattern="integration" src/__tests__/
```

**Cobertura Esperada**: > 80% de componentes clave

---

## Nivel 3️⃣: **System Tests** (Pruebas de Sistema)

### 📍 Alcance
Probar sistema completo. Verificar navegación entre dominios, persistencia de estado, compatibilidad global.

### 🎯 Requisitos Cubiertos
- **Todas RF**: Sistema operativo como un todo
- **Navegación**: Cambios entre Inicio → 3 Temas
- **Persistencia**: Estado durante sesión

### 📝 Casos de Test

```javascript
// src/__tests__/app.integration.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App - System Tests', () => {
  test('renders home page on initial load', () => {
    render(<App />);
    
    expect(screen.getByText(/Bienvenido a Mentes Creativas/i)).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('navigates between all three themes', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Navigate to Sistema Solar
    await user.click(screen.getByRole('link', { name: /Sistema Solar/i }));
    expect(screen.getByText(/planeta/i)).toBeInTheDocument();
    
    // Navigate to Formas 3D
    await user.click(screen.getByRole('link', { name: /Formas 3D/i }));
    expect(screen.getByText(/Cubo|Esfera|Cilindro/i)).toBeInTheDocument();
    
    // Navigate to Mariposas
    await user.click(screen.getByRole('link', { name: /Mariposas/i }));
    expect(screen.getByText(/Especie/i)).toBeInTheDocument();
    
    // Return to home
    await user.click(screen.getByRole('link', { name: /Inicio/i }));
    expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();
  });

  test('renders all components without errors', () => {
    render(<App />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test('handles rapid navigation without crashes', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const links = screen.getAllByRole('link');
    
    // Rapidly click through navigation
    for (let i = 0; i < 5; i++) {
      for (const link of links) {
        await user.click(link);
      }
    }
    
    // App should still be responsive
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
```

### ✅ Ejecución
```bash
npm run build
npm test -- src/__tests__/app.integration.test.tsx
```

**Criterio de Éxito**: 0 errores, 0 warnings

---

## Nivel 4️⃣: **Deployment Tests** (Pruebas de Despliegue)

### 📍 Alcance
Verificar que la aplicación construida (build) funciona correctamente. Validar assets, configuración, compatibilidad.

### 🎯 Requisitos Cubiertos
- Build correctamente optimizado
- Tamaño de bundle razonable
- Assets cargados correctamente
- TypeScript sin errores
- ESLint cumple estándares

### 📝 Checklist de Validación

```bash
# 1. Type checking
✅ npx tsc --noEmit
   → Sin errores de TypeScript

# 2. Linting
✅ npm run lint
   → ESLint sin problemas

# 3. Build production
✅ npm run build
   → Build exitoso sin warnings

# 4. Verificar tamaños
```javascript
// Script: check-build-size.js
const fs = require('fs');
const path = require('path');

const distSize = (dir) => {
  return fs.readdirSync(dir).reduce((size, file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    return size + (stat.isDirectory() ? distSize(filePath) : stat.size);
  }, 0);
};

const size = distSize('./dist');
const sizeMB = (size / 1024 / 1024).toFixed(2);

console.log(`📦 Build size: ${sizeMB} MB`);

if (sizeMB > 5) {
  console.error('❌ Build too large! Max 5MB recommended');
  process.exit(1);
}

console.log('✅ Build size OK');
```

```bash
# 5. Verificar archivos críticos
✅ dist/index.html
✅ dist/assets/*.js (main bundle)
✅ dist/assets/*.css (styles)
```

### ✅ Ejecución
```bash
npm run build
node check-build-size.js
ls -lah dist/
```

**Criterios de Aceptación**:
- ✅ Build < 5MB
- ✅ Sin errores TypeScript
- ✅ ESLint score 10/10
- ✅ 0 console errors

---

## Nivel 5️⃣: **Acceptance Tests** (Pruebas de Aceptación)

### 📍 Alcance
Validar que la aplicación cumple con requisitos de negocio desde perspectiva del usuario final (estudiante 4°-5° grado).

### 🎯 Requisitos a Validar
Cada uno de los **18 requisitos funcionales** (RF1.1-RF3.7)

### 📝 Escenarios de Aceptación

#### Escenario 1: Student Learns Solar System
```gherkin
# features/solar-system.feature
Feature: Solar System Learning Module
  As a 4th-5th grade student
  I want to learn about planets in our solar system
  So that I understand the solar system better

  Scenario: Student views planet information
    Given I am on the home page
    When I click "Sistema Solar"
    Then I see 8 planets displayed
    And I can click each planet to see information
    And each planet has name, distance, and description in Spanish
    
  Scenario: Student takes planet quiz
    Given I have selected a planet
    When I click "Tomar Quiz"
    Then I see 3 questions about that planet
    And I can select answers
    And I receive immediate feedback (Correct/Incorrect)
    And I see my final score as a percentage
```

#### Escenario 2: Student Learns Geometry
```gherkin
Feature: 3D Shapes Learning Module
  Scenario: Student manipulates cube dimensions
    Given I am on the Formas 3D page
    When I select "Cubo"
    And I adjust the side length slider to 4
    Then the 3D cube updates in real-time
    And the area displays as 96 (6 * 4²)
    And the volume displays as 64 (4³)
    And the visual representation updates correctly
```

#### Escenario 3: Student Studies Butterflies & Symmetry
```gherkin
Feature: Butterflies & Symmetry Module
  Scenario: Student explores butterfly species
    Given I am on the Simetría: Mariposas page
    When I select a butterfly species from the dropdown
    Then I see the 3D butterfly with bilateral symmetry
    And information displays (wingspan, region, weight)
    And I can control the wing beat speed with a slider
    And the animation reflects the speed change
```

### 📝 Test Script - Acceptance Manual

```
🧪 ACCEPTANCE TEST CHECKLIST
Student: [Name]        Date: [Today]       Platform: [Browser]

NAVIGATION & UI
  [ ] Home page loads with title "Bienvenido a Mentes Creativas!!"
  [ ] Sidebar visible with 4 navigation options
  [ ] Can click each nav item without errors
  [ ] Page title updates when navigating
  [ ] Can navigate back to home from any page

SISTEMA SOLAR (RF1.1-1.5)
  [ ] Can see 8 planets listed
  [ ] Can click each planet
  [ ] Information panel shows planet details (name, distance, diameter, etc)
  [ ] Quiz button appears after selecting planet
  [ ] Quiz has exactly 3 questions
  [ ] Can select answers to quiz questions
  [ ] Feedback appears immediately (✓ Correcto o ✗ Incorrecto)
  [ ] Final score shown as percentage
  [ ] Can take quiz again

FORMAS 3D (RF2.1-2.6)
  [ ] Can see shape selector (Cubo, Esfera, Cilindro)
  [ ] Can select each shape
  [ ] Sliders appear for shape dimensions
  [ ] 3D shape displays and updates when dragging sliders
  [ ] Area calculation updates in real-time
  [ ] Volume calculation updates in real-time
  [ ] Calculations match expected values
  [ ] Quiz has 3 geometry questions
  [ ] Can answer quiz and receive score

SIMETRÍA: MARIPOSAS (RF3.1-3.7)
  [ ] Can see dropdown with 11 butterfly species
  [ ] Can select each species
  [ ] 3D butterfly displays with clear bilateral symmetry
  [ ] Speed slider works for wing animation
  [ ] Information shows (species name, wingspan, weight, region)
  [ ] Quiz about symmetry has 3 questions
  [ ] Can answer and receive score
  [ ] Can switch between species easily

OVERALL QUALITY
  [ ] No console errors at any point
  [ ] Buttons are clickable and responsive (> 44px)
  [ ] Colors have good contrast
  [ ] Text is readable in all sections
  [ ] Navigation is intuitive (< 2 min to learn)
  [ ] All interactive elements labeled
  [ ] No broken images or missing content
  [ ] Loading times acceptable (< 2 sec per page)

SCORE: [  ]/35 ✓ PASS / ✗ FAIL
TESTER NOTES: ________________________________
```

### ✅ Ejecución
```bash
# Manual testing in browser
npm run dev
# Open http://localhost:5173 in browser
# Follow test script above

# OR automated E2E (si se implementa)
npm run test:e2e  # Requiere Playwright/Cypress
```

**Criterio de Aceptación Final**:
- ✅ 35/35 checks passed
- ✅ 0 broken features
- ✅ Usable por estudiante sin instrucciones

---

## 📊 Resumen de Testing

| Nivel | Herramienta | Cobertura | Status |
|-------|-------------|-----------|--------|
| **Unit** | Jest | 90%+ funciones | ✅ Implementado |
| **Integration** | Jest + RTL | 80%+ componentes | ✅ Implementado |
| **System** | Jest + RTL | 100% flujos | ✅ Implementado |
| **Deployment** | npm scripts + custom | Build + assets | ✅ Automatizado |
| **Acceptance** | Manual + Postman | 18 RFs | ⏳ Manual |

---

## 🎯 Comandos Rápidos

```bash
# Ejecutar todos los tests
npm test -- --coverage

# Unit tests solo
npm test -- geometry.test.ts

# Integration tests
npm test -- src/__tests__/

# System tests
npm test -- app.integration.test.tsx

# Deployment checks
npm run build && npm run lint && npx tsc --noEmit

# Postman integration tests
npm run test:postman  # Vía CI/CD
```

---

**Documento creado**: 2024  
**Próxima actualización**: Después de implementar E2E tests  
