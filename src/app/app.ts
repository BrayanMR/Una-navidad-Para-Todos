import { Component, HostListener, signal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ParticipationOption {
  id: string;
  title: string;
  description: string;
  badge: string;
  color: string;
  textColor: string;
  borderHover: string;
}

export interface CarouselSlide {
  src: string;
  tag: string;
  title: string;
  location: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private carouselInterval: any = null;
  private cardsInterval: any = null;

  // Catálogo completo de fotos de niños recibiendo regalos
  allKidsPhotos: string[] = [
    'images/ninos/nino-1.png', 'images/ninos/nino-2.png', 'images/ninos/nino-3.png', 'images/ninos/nino-4.png',
    'images/ninos/nino-5.png', 'images/ninos/nino-6.png', 'images/ninos/nino-7.png', 'images/ninos/nino-8.png',
    'images/ninos/nino-9.png', 'images/ninos/nino-10.png', 'images/ninos/nino-11.png', 'images/ninos/nino-12.png',
    'images/ninos/nino-13.png', 'images/ninos/nino-14.png', 'images/ninos/nino-15.png', 'images/ninos/nino-16.png',
    'images/ninos/nino-17.png', 'images/ninos/nino-18.png', 'images/ninos/nino-19.png', 'images/ninos/nino-20.png',
    'images/ninos/nino-21.png', 'images/ninos/nino-22.png', 'images/ninos/nino-23.png', 'images/ninos/nino-24.png',
    'images/ninos/nino-25.png', 'images/ninos/nino-26.png', 'images/ninos/nino-27.png', 'images/ninos/nino-28.png',
    'images/ninos/nino-29.png', 'images/ninos/nino-30.png', 'images/ninos/nino-31.png', 'images/ninos/nino-32.png',
    'images/ninos/nino-33.png', 'images/ninos/nino-34.png', 'images/ninos/nino-35.png', 'images/ninos/nino-36.png',
    'images/ninos/nino-37.png', 'images/ninos/nino-38.png', 'images/ninos/nino-39.png', 'images/ninos/nino-40.png',
    'images/ninos/nino-41.png', 'images/ninos/nino-42.png', 'images/ninos/nino-43.png', 'images/ninos/nino-44.png',
    'images/ninos/nino-45.png', 'images/ninos/nino-46.png', 'images/ninos/nino-47.png', 'images/ninos/nino-48.png',
    'images/ninos/nino-49.png', 'images/ninos/nino-50.png', 'images/ninos/nino-51.jpeg', 'images/ninos/nino-52.jpeg',
    'images/ninos/nino-53.jpeg', 'images/ninos/nino-54.jpg', 'images/ninos/nino-55.jpeg', 'images/ninos/nino-56.jpeg',
    'images/ninos/nino-57.jpeg', 'images/ninos/nino-58.jpeg', 'images/ninos/nino-59.jpeg'
  ];

  // Índices para las 3 tarjetas de propósito (nunca coinciden entre sí)
  cardPhoto1 = signal<string>('images/ninos/nino-1.png');
  cardPhoto2 = signal<string>('images/ninos/nino-2.png');
  cardPhoto3 = signal<string>('images/ninos/nino-3.png');
  private currentKidsIndex = 3;

  // Carrusel Fotográfico en Formulario
  currentSlideIndex = signal<number>(0);
  carouselSlides: CarouselSlide[] = [
    {
      src: 'images/ninos/nino-1.png',
      tag: 'Sonrisas Reales',
      title: 'Alegría en la entrega de regalos',
      location: 'Funza, Cundinamarca'
    },
    {
      src: 'images/ninos/nino-2.png',
      tag: 'Momento de Gratitud',
      title: 'Un regalo que enciende la ilusión',
      location: 'Mosquera, Cundinamarca'
    },
    {
      src: 'images/ninos/nino-3.png',
      tag: 'Acompañamiento Digno',
      title: 'Comunidad unida por la niñez',
      location: 'Sabana de Occidente'
    },
    {
      src: 'images/ninos/nino-4.png',
      tag: 'Esperanza y Futuro',
      title: 'Transformando vidas con cada detalle',
      location: 'Funza y Mosquera'
    },
    {
      src: 'images/ninos/nino-5.png',
      tag: 'Entrega en Comunidad',
      title: 'Ilusión compartida en terreno',
      location: 'Mosquera, Cundinamarca'
    },
    {
      src: 'images/ninos/nino-6.png',
      tag: 'Sonrisas Inolvidables',
      title: 'Detalles que marcan la diferencia',
      location: 'Funza, Cundinamarca'
    }
  ];
  // Navegación
  mobileMenuOpen = signal<boolean>(false);
  navScrolled = signal<boolean>(false);

  // Scroll offset interactivo para elementos flotantes (efecto parallax ligero)
  scrollY = signal<number>(0);

  // Formularios Especializados por Opción
  activeTab = signal<'donar' | 'colegio' | 'voluntario' | 'empresa'>('donar');

  formDonar = {
    name: '',
    email: '',
    phone: '',
    municipality: 'funza',
    quantity: '1',
    giftCategory: 'juguetes',
    deliveryMethod: 'punto_acopio',
    notes: ''
  };

  formColegio = {
    institutionName: '',
    contactPerson: '',
    roleOrPosition: '',
    email: '',
    phone: '',
    municipality: 'funza',
    estimatedStudents: '100-300',
    activityProposal: 'campana_salones',
    preferredDate: '',
    notes: ''
  };

  formVoluntario = {
    fullName: '',
    documentNumber: '',
    age: '',
    email: '',
    phone: '',
    municipality: 'funza',
    areaInterest: 'clasificacion_empaque',
    availability: 'fines_semana',
    priorExperience: '',
    healthObservations: ''
  };

  formEmpresa = {
    companyName: '',
    nit: '',
    contactPerson: '',
    position: '',
    email: '',
    phone: '',
    contributionType: 'donacion_regalos',
    needsCertificate: 'si',
    municipality: 'ambos',
    proposalDetail: ''
  };

  formSubmitted = signal<boolean>(false);
  submittedDataSummary = signal<{ title: string; contactName: string; email: string; details: string }>({
    title: '',
    contactName: '',
    email: '',
    details: ''
  });

  // Opciones de Participación
  options: ParticipationOption[] = [
    {
      id: 'donar',
      title: 'Quiero Donar Regalos',
      description: 'Dona uno o más regalos nuevos para niños, niñas o pacientes oncológicos.',
      badge: 'Donación Directa',
      color: 'bg-blue-50/70 border-blue-200',
      textColor: 'text-[#0052FF]',
      borderHover: 'hover:border-[#0052FF]'
    },
    {
      id: 'colegio',
      title: 'Vincular mi Colegio',
      description: 'Organiza una jornada de recolección solidaria en tu institución escolar.',
      badge: 'Institucional',
      color: 'bg-pink-50/70 border-pink-200',
      textColor: 'text-[#E6007A]',
      borderHover: 'hover:border-[#E6007A]'
    },
    {
      id: 'voluntario',
      title: 'Ser Voluntario',
      description: 'Acompáñanos en la clasificación, empaque artesanal y entrega en terreno.',
      badge: 'En Terreno',
      color: 'bg-teal-50/70 border-teal-200',
      textColor: 'text-teal-700',
      borderHover: 'hover:border-[#00D2D3]'
    },
    {
      id: 'empresa',
      title: 'Empresa o Aliado',
      description: 'Aportes corporativos, transporte, refrigerios o apadrinamiento de comunidades.',
      badge: 'Alianza',
      color: 'bg-cyan-50/70 border-cyan-200',
      textColor: 'text-teal-700',
      borderHover: 'hover:border-[#00D2D3]'
    }
  ];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    this.scrollY.set(currentScroll);
    this.navScrolled.set(currentScroll > 20);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  scrollToSection(sectionId: string): void {
    this.closeMobileMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  openFormWithOption(typeId: string): void {
    if (typeId === 'donar' || typeId === 'colegio' || typeId === 'voluntario' || typeId === 'empresa') {
      this.activeTab.set(typeId);
    }
    this.scrollToSection('formulario');
  }

  setTab(tab: 'donar' | 'colegio' | 'voluntario' | 'empresa'): void {
    this.activeTab.set(tab);
  }

  submitDonar(): void {
    if (!this.formDonar.name || !this.formDonar.email || !this.formDonar.phone) return;
    this.submittedDataSummary.set({
      title: 'Donación de Regalos Registrada',
      contactName: this.formDonar.name,
      email: this.formDonar.email,
      details: `Modalidad: ${this.formDonar.quantity} detalle(s) (${this.formDonar.giftCategory}) para entrega en ${this.formDonar.municipality === 'funza' ? 'Funza' : this.formDonar.municipality === 'mosquera' ? 'Mosquera' : 'Funza y Mosquera'}.`
    });
    this.formSubmitted.set(true);
    this.scrollToSection('formulario');
  }

  submitColegio(): void {
    if (!this.formColegio.institutionName || !this.formColegio.contactPerson || !this.formColegio.email || !this.formColegio.phone) return;
    this.submittedDataSummary.set({
      title: 'Vinculación Institucional Escolar Registrada',
      contactName: this.formColegio.contactPerson,
      email: this.formColegio.email,
      details: `Institución: ${this.formColegio.institutionName} (${this.formColegio.municipality === 'funza' ? 'Funza' : 'Mosquera'}). Estudiantes estimados: ${this.formColegio.estimatedStudents}.`
    });
    this.formSubmitted.set(true);
    this.scrollToSection('formulario');
  }

  submitVoluntario(): void {
    if (!this.formVoluntario.fullName || !this.formVoluntario.email || !this.formVoluntario.phone) return;
    this.submittedDataSummary.set({
      title: 'Postulación de Voluntariado Registrada',
      contactName: this.formVoluntario.fullName,
      email: this.formVoluntario.email,
      details: `Disponibilidad: ${this.formVoluntario.availability} en sede ${this.formVoluntario.municipality === 'funza' ? 'Funza' : 'Mosquera'} para el área de ${this.formVoluntario.areaInterest.replace('_', ' ')}.`
    });
    this.formSubmitted.set(true);
    this.scrollToSection('formulario');
  }

  submitEmpresa(): void {
    if (!this.formEmpresa.companyName || !this.formEmpresa.contactPerson || !this.formEmpresa.email || !this.formEmpresa.phone) return;
    this.submittedDataSummary.set({
      title: 'Alianza Corporativa Registrada',
      contactName: this.formEmpresa.contactPerson,
      email: this.formEmpresa.email,
      details: `Organización: ${this.formEmpresa.companyName}. Tipo de aporte: ${this.formEmpresa.contributionType.replace('_', ' ')}.`
    });
    this.formSubmitted.set(true);
    this.scrollToSection('formulario');
  }

  // Galería Interactiva Curada 2026
  galleryFilter = signal<'todos' | 'ninos' | 'equipo'>('todos');
  selectedPhoto = signal<{ src: string; title: string; category: string; badge: string; description: string } | null>(null);

  galleryItems = [
    {
      id: 1,
      src: 'images/galeria/equipo-1.png',
      category: 'equipo',
      badge: 'Jornada Central',
      title: 'Voluntariado y Familias',
      description: 'Líderes de SELAH, M180 y AMENIA en la entrega oficial en Mosquera.'
    },
    {
      id: 2,
      src: 'images/galeria/nino-1.png',
      category: 'ninos',
      badge: 'Infancia',
      title: 'Ilusión y Sonrisas',
      description: 'Niña de la comunidad recibiendo su obsequio nuevo seleccionado para su edad.'
    },
    {
      id: 3,
      src: 'images/galeria/equipo-2.png',
      category: 'equipo',
      badge: 'Logística',
      title: 'Equipo de Embalaje',
      description: 'Clasificación previa y preparación artesanal de los paquetes de regalo.'
    },
    {
      id: 4,
      src: 'images/galeria/nino-2.png',
      category: 'ninos',
      badge: 'Celebración',
      title: 'Momento de Gratitud',
      description: 'Alegría en el rostro de los beneficiarios al compartir una jornada digna.'
    },
    {
      id: 5,
      src: 'images/galeria/nino-3.png',
      category: 'ninos',
      badge: 'Cercanía',
      title: 'Acompañamiento en Barrio',
      description: 'Entrega directa casa a casa y en salones comunitarios de Sabana de Occidente.'
    },
    {
      id: 6,
      src: 'images/galeria/equipo-3.png',
      category: 'equipo',
      badge: 'Alianza',
      title: 'Juventud Solidaria',
      description: 'Jóvenes voluntarios coordinando la recreación y el bienestar infantil.'
    }
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startCarouselAutoPlay();
      this.startCardsRotation();
    }
  }

  ngOnDestroy(): void {
    this.stopCarouselAutoPlay();
    this.stopCardsRotation();
  }

  startCardsRotation(): void {
    this.stopCardsRotation();
    this.cardsInterval = setInterval(() => {
      this.rotateCardsPhotos();
    }, 5000);
  }

  stopCardsRotation(): void {
    if (this.cardsInterval) {
      clearInterval(this.cardsInterval);
      this.cardsInterval = null;
    }
  }

  rotateCardsPhotos(): void {
    const total = this.allKidsPhotos.length;
    // Seleccionar 3 fotos consecutivas del catálogo completo sin repetirse
    const p1 = this.allKidsPhotos[this.currentKidsIndex % total];
    const p2 = this.allKidsPhotos[(this.currentKidsIndex + 1) % total];
    const p3 = this.allKidsPhotos[(this.currentKidsIndex + 2) % total];

    this.cardPhoto1.set(p1);
    this.cardPhoto2.set(p2);
    this.cardPhoto3.set(p3);

    this.currentKidsIndex = (this.currentKidsIndex + 3) % total;
  }

  startCarouselAutoPlay(): void {
    this.stopCarouselAutoPlay();
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopCarouselAutoPlay(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = null;
    }
  }

  nextSlide(): void {
    this.currentSlideIndex.update(idx => (idx + 1) % this.carouselSlides.length);
  }

  prevSlide(): void {
    this.currentSlideIndex.update(idx => (idx - 1 + this.carouselSlides.length) % this.carouselSlides.length);
  }

  goToSlide(index: number): void {
    this.currentSlideIndex.set(index);
    this.startCarouselAutoPlay();
  }

  resetForm(): void {
    this.formSubmitted.set(false);
  }
}
