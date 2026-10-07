import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Navegación
  mobileMenuOpen = signal<boolean>(false);
  navScrolled = signal<boolean>(false);

  // Scroll offset interactivo para elementos flotantes (efecto parallax ligero)
  scrollY = signal<number>(0);

  // Formulario Directo Oficial
  formData = {
    name: '',
    email: '',
    phone: '',
    type: 'donar',
    quantity: '1',
    municipality: 'funza',
    comments: ''
  };

  formSubmitted = signal<boolean>(false);

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
      color: 'bg-amber-50/70 border-amber-200',
      textColor: 'text-amber-700',
      borderHover: 'hover:border-[#FFD600]'
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
    this.formData.type = typeId;
    this.scrollToSection('formulario');
  }

  submitDonationForm(): void {
    if (!this.formData.name || !this.formData.email) return;

    this.formSubmitted.set(true);
    this.scrollToSection('formulario');
  }

  resetForm(): void {
    this.formSubmitted.set(false);
    this.formData = {
      name: '',
      email: '',
      phone: '',
      type: 'donar',
      quantity: '1',
      municipality: 'funza',
      comments: ''
    };
  }
}
