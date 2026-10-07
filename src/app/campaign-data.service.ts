import { Injectable, signal } from '@angular/core';

export interface CampaignImpact {
  giftsPrepared: number;
  institutionsCount: number;
  familiesReached: number;
  municipalitiesCount: number;
}

export interface ParticipationOption {
  id: string;
  badge: string;
  title: string;
  description: string;
  actionText: string;
  icon: string;
  highlight: boolean;
}

export interface StoryItem {
  id: string;
  category: string;
  title: string;
  quote: string;
  author: string;
  location: string;
  role: string;
  imageHint: string;
}

export interface HopeMessage {
  id: string;
  author: string;
  cityOrSchool: string;
  text: string;
  date: string;
  likes: number;
}

export interface GalleryItem {
  id: string;
  category: 'voluntarios' | 'preparacion' | 'comunidad' | 'instituciones';
  title: string;
  caption: string;
  tag: string;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignDataService {
  // Datos editables de Impacto
  readonly impactMetrics = signal<CampaignImpact>({
    giftsPrepared: 1248,
    institutionsCount: 18,
    familiesReached: 426,
    municipalitiesCount: 2
  });

  // Opciones de Participación
  readonly participationOptions = signal<ParticipationOption[]>([
    {
      id: 'donar',
      badge: 'Gesto Individual',
      title: 'Quiero Donar un Regalo',
      description: 'Aporta un regalo nuevo, didáctico o recreativo que encienda la ilusión de un niño en Funza o Mosquera.',
      actionText: 'Donar un regalo',
      icon: 'gift',
      highlight: true
    },
    {
      id: 'colegio',
      badge: 'Alianza Educativa',
      title: 'Quiero Vincular mi Colegio',
      description: 'Convierte tu institución en un faro de empatía: jornadas de recolección de juguetes y cartas de esperanza.',
      actionText: 'Vincular mi colegio',
      icon: 'academic',
      highlight: false
    },
    {
      id: 'voluntario',
      badge: 'Manos y Corazón',
      title: 'Quiero Ser Voluntario',
      description: 'Acompáñanos en la clasificación respetuosa, empaque artesanal y las jornadas de entrega en territorio.',
      actionText: 'Sumarme como voluntario',
      icon: 'heart-hand',
      highlight: false
    },
    {
      id: 'aliado',
      badge: 'Impacto Corporativo',
      title: 'Quiero Ser Aliado',
      description: 'Empresas y organizaciones que aportan transporte, refrigerios, dotación o apadrinamiento de comunidades.',
      actionText: 'Ser empresa aliada',
      icon: 'sparkles',
      highlight: false
    }
  ]);

  // Historias y Testimonios con Enfoque de Dignidad
  readonly stories = signal<StoryItem[]>([
    {
      id: 's1',
      category: 'Voluntariado Territorial',
      title: 'El puente entre dos municipios',
      quote: 'Cuando empacamos cada regalo, no ponemos solo un juguete: escribimos un nombre y bendecimos a una familia entera.',
      author: 'Camila R.',
      location: 'Mosquera, Cundinamarca',
      role: 'Voluntaria líder del equipo de clasificación',
      imageHint: 'Voluntaria organizando con esmero los paquetes etiquetados con lazos claros'
    },
    {
      id: 's2',
      category: 'Institución Educativa',
      title: 'Lecciones de empatía en el aula',
      quote: 'Nuestros estudiantes aprendieron que la Navidad no es esperar recibir, sino descubrir la alegría inmensa de dar.',
      author: 'Profesor Andrés G.',
      location: 'Colegio Aliado en Funza',
      role: 'Coordinador de Pastoral & Solidaridad',
      imageHint: 'Jóvenes estudiantes escribiendo cartas de aliento con caligrafía sincera'
    },
    {
      id: 's3',
      category: 'Acompañamiento Integral',
      title: 'Luz para los pequeños valientes',
      quote: 'Para los niños en tratamiento oncológico, un detalle pensado para su bienestar es un recordatorio de que no caminan solos.',
      author: 'Dra. Elena V.',
      location: 'Unidad de Acompañamiento Familiar',
      role: 'Especialista en Apoyo Emocional',
      imageHint: 'Espacio cálido de arteterapia con colores suaves y atmósfera reconfortante'
    }
  ]);

  // Mensajes en el Muro de la Esperanza
  readonly hopeWallMessages = signal<HopeMessage[]>([
    {
      id: 'm1',
      author: 'Familia Morales Duarte',
      cityOrSchool: 'Funza',
      text: 'Que cada sonrisa encendida en esta Navidad sea una luz que guíe los sueños de nuestros niños.',
      date: 'Hace 2 horas',
      likes: 34
    },
    {
      id: 'm2',
      author: 'Grado 9B - Col. San Jerónimo',
      cityOrSchool: 'Mosquera',
      text: 'Con amor desde nuestras aulas. ¡Unidos somos una sola familia cundinamarquesa!',
      date: 'Ayer',
      likes: 58
    },
    {
      id: 'm3',
      author: 'Mariana & David',
      cityOrSchool: 'Bogotá / Sabana',
      text: 'Un pequeño gesto multiplicado por muchos corazones transforma cualquier realidad.',
      date: 'Hace 3 días',
      likes: 42
    },
    {
      id: 'm4',
      author: 'Equipo SELAH & M18’',
      cityOrSchool: 'Comité de Amor',
      text: 'La dignidad, la alegría y la salud de nuestros niños son nuestra mayor inspiración.',
      date: 'Hace 4 días',
      likes: 91
    }
  ]);

  // Elementos de la Galería Magazine
  readonly galleryItems = signal<GalleryItem[]>([
    {
      id: 'g1',
      category: 'preparacion',
      title: 'Cuidado y Etiquetado',
      caption: 'Clasificación personalizada por edad e intereses pedagógicos para cada niño.',
      tag: '#PreparaciónDigna'
    },
    {
      id: 'g2',
      category: 'voluntarios',
      title: 'Manos Solidarias en Funza',
      caption: 'Encuentro intergeneracional uniendo fuerzas y alegría comunitaria.',
      tag: '#FuerzaVoluntaria'
    },
    {
      id: 'g3',
      category: 'instituciones',
      title: 'Colegios que Siembran Esperanza',
      caption: 'Campaña de apadrinamiento entre escolares y niños de Mosquera.',
      tag: '#EducaciónParaDar'
    },
    {
      id: 'g4',
      category: 'comunidad',
      title: 'Momentos que Trascienden',
      caption: 'Espacios de diálogo, arte y recreación que devuelven la ilusión en familia.',
      tag: '#NavidadParaTodos'
    }
  ]);

  addHopeMessage(author: string, cityOrSchool: string, text: string): void {
    const newMessage: HopeMessage = {
      id: 'm-' + Date.now(),
      author: author.trim() || 'Amigo de la Campaña',
      cityOrSchool: cityOrSchool.trim() || 'Sabana de Occidente',
      text: text.trim(),
      date: 'Justo ahora',
      likes: 1
    };
    this.hopeWallMessages.update(msgs => [newMessage, ...msgs]);
  }
}
