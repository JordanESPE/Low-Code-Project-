"""
Script para generar visualizaciones del estudio sobre Low-Code
Evaluación del impacto en productividad y calidad del desarrollo de software
"""

import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
from pathlib import Path

# Configuración de estilo
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (10, 6)
plt.rcParams['font.size'] = 10

# Crear carpeta de imágenes si no existe
images_dir = Path("images")
images_dir.mkdir(exist_ok=True)


def generate_productivity_comparison():
    """Gráfica comparativa de productividad: Low-Code vs Tradicional"""
    
    categories = ['Tiempo de\nDesarrollo\n(horas)', 
                  'Funcionalidades\nImplementadas',
                  'Velocidad de\nIteración\n(iter/día)',
                  'Reutilización\nde\nComponentes (%)']
    
    # Datos simulados basados en estudios de Low-Code
    low_code = [45, 12, 3.5, 75]
    traditional = [85, 10, 1.8, 40]
    
    x = np.arange(len(categories))
    width = 0.35
    
    fig, ax = plt.subplots(figsize=(12, 7))
    bars1 = ax.bar(x - width/2, low_code, width, label='Low-Code', 
                   color='#2E86DE', alpha=0.8, edgecolor='black', linewidth=1.2)
    bars2 = ax.bar(x + width/2, traditional, width, label='Tradicional',
                   color='#EE5A6F', alpha=0.8, edgecolor='black', linewidth=1.2)
    
    ax.set_ylabel('Valor de la Métrica', fontweight='bold', fontsize=12)
    ax.set_xlabel('Métricas de Productividad', fontweight='bold', fontsize=12)
    ax.set_title('Comparación de Productividad: Low-Code vs Desarrollo Tradicional',
                 fontweight='bold', fontsize=14, pad=20)
    ax.set_xticks(x)
    ax.set_xticklabels(categories)
    ax.legend(loc='upper right', fontsize=11, framealpha=0.95)
    
    # Añadir valores sobre las barras
    def autolabel(bars):
        for bar in bars:
            height = bar.get_height()
            ax.annotate(f'{height:.1f}',
                       xy=(bar.get_x() + bar.get_width() / 2, height),
                       xytext=(0, 3),
                       textcoords="offset points",
                       ha='center', va='bottom',
                       fontweight='bold', fontsize=9)
    
    autolabel(bars1)
    autolabel(bars2)
    
    plt.tight_layout()
    plt.savefig(images_dir / 'productivity_comparison.eps', format='eps', dpi=300, bbox_inches='tight')
    plt.savefig(images_dir / 'productivity_comparison.png', dpi=300, bbox_inches='tight')
    print("✓ Gráfica de productividad generada")
    plt.close()


def generate_quality_metrics():
    """Gráfica de métricas de calidad del software"""
    
    metrics = ['Defectos\nDetectados', 'Cobertura de\nPruebas (%)', 
               'Mantenibilidad\n(0-100)', 'Usabilidad\nSUS (0-100)']
    
    low_code_quality = [8, 82, 78, 85]
    traditional_quality = [15, 75, 72, 78]
    
    x = np.arange(len(metrics))
    width = 0.35
    
    fig, ax = plt.subplots(figsize=(12, 7))
    bars1 = ax.bar(x - width/2, low_code_quality, width, label='Low-Code',
                   color='#10AC84', alpha=0.8, edgecolor='black', linewidth=1.2)
    bars2 = ax.bar(x + width/2, traditional_quality, width, label='Tradicional',
                   color='#FF6348', alpha=0.8, edgecolor='black', linewidth=1.2)
    
    ax.set_ylabel('Valor de la Métrica', fontweight='bold', fontsize=12)
    ax.set_xlabel('Métricas de Calidad', fontweight='bold', fontsize=12)
    ax.set_title('Comparación de Calidad del Software: Low-Code vs Desarrollo Tradicional',
                 fontweight='bold', fontsize=14, pad=20)
    ax.set_xticks(x)
    ax.set_xticklabels(metrics)
    ax.legend(loc='upper right', fontsize=11, framealpha=0.95)
    
    # Añadir valores sobre las barras
    def autolabel(bars):
        for bar in bars:
            height = bar.get_height()
            ax.annotate(f'{height:.0f}',
                       xy=(bar.get_x() + bar.get_width() / 2, height),
                       xytext=(0, 3),
                       textcoords="offset points",
                       ha='center', va='bottom',
                       fontweight='bold', fontsize=9)
    
    autolabel(bars1)
    autolabel(bars2)
    
    plt.tight_layout()
    plt.savefig(images_dir / 'quality_metrics.eps', format='eps', dpi=300, bbox_inches='tight')
    plt.savefig(images_dir / 'quality_metrics.png', dpi=300, bbox_inches='tight')
    print("✓ Gráfica de calidad generada")
    plt.close()


def generate_learning_curve():
    """Curva de aprendizaje a lo largo del tiempo"""
    
    weeks = np.arange(1, 11)
    low_code_productivity = [30, 50, 65, 75, 82, 87, 90, 92, 94, 95]
    traditional_productivity = [20, 35, 48, 58, 66, 72, 77, 81, 84, 86]
    
    fig, ax = plt.subplots(figsize=(12, 7))
    ax.plot(weeks, low_code_productivity, marker='o', linewidth=2.5, 
            markersize=8, label='Low-Code', color='#5F27CD', alpha=0.8)
    ax.plot(weeks, traditional_productivity, marker='s', linewidth=2.5,
            markersize=8, label='Tradicional', color='#F79F1F', alpha=0.8)
    
    ax.set_xlabel('Semanas de Experiencia', fontweight='bold', fontsize=12)
    ax.set_ylabel('Productividad (%)', fontweight='bold', fontsize=12)
    ax.set_title('Curva de Aprendizaje: Productividad a lo Largo del Tiempo',
                 fontweight='bold', fontsize=14, pad=20)
    ax.legend(loc='lower right', fontsize=11, framealpha=0.95)
    ax.grid(True, alpha=0.3)
    ax.set_xticks(weeks)
    
    plt.tight_layout()
    plt.savefig(images_dir / 'learning_curve.eps', format='eps', dpi=300, bbox_inches='tight')
    plt.savefig(images_dir / 'learning_curve.png', dpi=300, bbox_inches='tight')
    print("✓ Curva de aprendizaje generada")
    plt.close()


def generate_satisfaction_survey():
    """Gráfica de satisfacción de usuarios"""
    
    aspects = ['Facilidad de\nUso', 'Documentación', 'Velocidad de\nDesarrollo',
               'Calidad del\nCódigo', 'Satisfacción\nGeneral']
    
    low_code_scores = [4.5, 4.2, 4.7, 4.0, 4.4]
    traditional_scores = [3.2, 3.8, 3.0, 4.2, 3.5]
    
    x = np.arange(len(aspects))
    width = 0.35
    
    fig, ax = plt.subplots(figsize=(12, 7))
    bars1 = ax.bar(x - width/2, low_code_scores, width, label='Low-Code',
                   color='#0FBCF9', alpha=0.8, edgecolor='black', linewidth=1.2)
    bars2 = ax.bar(x + width/2, traditional_scores, width, label='Tradicional',
                   color='#FD7272', alpha=0.8, edgecolor='black', linewidth=1.2)
    
    ax.set_ylabel('Puntuación (1-5)', fontweight='bold', fontsize=12)
    ax.set_xlabel('Aspectos Evaluados', fontweight='bold', fontsize=12)
    ax.set_title('Encuesta de Satisfacción de Estudiantes',
                 fontweight='bold', fontsize=14, pad=20)
    ax.set_xticks(x)
    ax.set_xticklabels(aspects)
    ax.set_ylim(0, 5)
    ax.legend(loc='upper right', fontsize=11, framealpha=0.95)
    ax.axhline(y=4.0, color='green', linestyle='--', alpha=0.5, linewidth=1.5, label='Objetivo (4.0)')
    
    # Añadir valores sobre las barras
    def autolabel(bars):
        for bar in bars:
            height = bar.get_height()
            ax.annotate(f'{height:.1f}',
                       xy=(bar.get_x() + bar.get_width() / 2, height),
                       xytext=(0, 3),
                       textcoords="offset points",
                       ha='center', va='bottom',
                       fontweight='bold', fontsize=9)
    
    autolabel(bars1)
    autolabel(bars2)
    
    plt.tight_layout()
    plt.savefig(images_dir / 'satisfaction_survey.eps', format='eps', dpi=300, bbox_inches='tight')
    plt.savefig(images_dir / 'satisfaction_survey.png', dpi=300, bbox_inches='tight')
    print("✓ Gráfica de satisfacción generada")
    plt.close()


def generate_complexity_analysis():
    """Análisis de complejidad de tareas"""
    
    complexity_levels = ['Básico', 'Intermedio', 'Avanzado', 'Experto']
    low_code_success = [95, 88, 72, 45]
    traditional_success = [92, 85, 78, 68]
    
    x = np.arange(len(complexity_levels))
    width = 0.35
    
    fig, ax = plt.subplots(figsize=(12, 7))
    bars1 = ax.bar(x - width/2, low_code_success, width, label='Low-Code',
                   color='#26DE81', alpha=0.8, edgecolor='black', linewidth=1.2)
    bars2 = ax.bar(x + width/2, traditional_success, width, label='Tradicional',
                   color='#FC5C65', alpha=0.8, edgecolor='black', linewidth=1.2)
    
    ax.set_ylabel('Tasa de Éxito (%)', fontweight='bold', fontsize=12)
    ax.set_xlabel('Nivel de Complejidad', fontweight='bold', fontsize=12)
    ax.set_title('Tasa de Éxito según Complejidad de la Tarea',
                 fontweight='bold', fontsize=14, pad=20)
    ax.set_xticks(x)
    ax.set_xticklabels(complexity_levels)
    ax.legend(loc='upper right', fontsize=11, framealpha=0.95)
    
    # Añadir valores sobre las barras
    def autolabel(bars):
        for bar in bars:
            height = bar.get_height()
            ax.annotate(f'{height:.0f}%',
                       xy=(bar.get_x() + bar.get_width() / 2, height),
                       xytext=(0, 3),
                       textcoords="offset points",
                       ha='center', va='bottom',
                       fontweight='bold', fontsize=9)
    
    autolabel(bars1)
    autolabel(bars2)
    
    plt.tight_layout()
    plt.savefig(images_dir / 'complexity_analysis.eps', format='eps', dpi=300, bbox_inches='tight')
    plt.savefig(images_dir / 'complexity_analysis.png', dpi=300, bbox_inches='tight')
    print("✓ Gráfica de análisis de complejidad generada")
    plt.close()


def generate_time_distribution():
    """Distribución del tiempo de desarrollo"""
    
    # Datos para Low-Code
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
    
    activities_lc = ['Diseño UI', 'Lógica de\nNegocio', 'Integración', 'Testing', 'Deployment']
    time_lc = [20, 35, 15, 20, 10]
    colors_lc = ['#4834DF', '#6C5CE7', '#A29BFE', '#74B9FF', '#00B8D4']
    
    wedges, texts, autotexts = ax1.pie(time_lc, labels=activities_lc, autopct='%1.1f%%',
                                        colors=colors_lc, startangle=90,
                                        textprops={'fontweight': 'bold', 'fontsize': 10})
    ax1.set_title('Distribución de Tiempo\nLow-Code', fontweight='bold', fontsize=13, pad=15)
    
    # Datos para Tradicional
    activities_tr = ['Diseño UI', 'Lógica de\nNegocio', 'Integración', 'Testing', 'Deployment']
    time_tr = [25, 40, 20, 10, 5]
    colors_tr = ['#E74C3C', '#E67E22', '#F39C12', '#F1C40F', '#16A085']
    
    wedges, texts, autotexts = ax2.pie(time_tr, labels=activities_tr, autopct='%1.1f%%',
                                        colors=colors_tr, startangle=90,
                                        textprops={'fontweight': 'bold', 'fontsize': 10})
    ax2.set_title('Distribución de Tiempo\nTradicional', fontweight='bold', fontsize=13, pad=15)
    
    plt.suptitle('Comparación de Distribución de Tiempo en Actividades de Desarrollo',
                 fontweight='bold', fontsize=14, y=1.02)
    plt.tight_layout()
    plt.savefig(images_dir / 'time_distribution.eps', format='eps', dpi=300, bbox_inches='tight')
    plt.savefig(images_dir / 'time_distribution.png', dpi=300, bbox_inches='tight')
    print("✓ Gráfica de distribución de tiempo generada")
    plt.close()


if __name__ == "__main__":
    print("\n" + "="*60)
    print("Generando Visualizaciones para el Estudio Low-Code")
    print("="*60 + "\n")
    
    generate_productivity_comparison()
    generate_quality_metrics()
    generate_learning_curve()
    generate_satisfaction_survey()
    generate_complexity_analysis()
    generate_time_distribution()
    
    print("\n" + "="*60)
    print("✓ Todas las visualizaciones generadas exitosamente")
    print(f"✓ Archivos guardados en: {images_dir.absolute()}")
    print("="*60 + "\n")
