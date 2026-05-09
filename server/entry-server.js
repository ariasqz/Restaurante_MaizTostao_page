import { renderToString } from "react-dom/server";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Calendar, Check, CheckCircle, ChefHat, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock, Copy, ExternalLink, Eye, Flame, Heart, Leaf, MapPin, Menu, MessageCircle, Phone, Star, Target, User, Users, Utensils, Volume2, VolumeX, X, ZoomIn } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/sections/Header.tsx
var Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 100);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const navLinks = [
		{
			name: "Inicio",
			href: "#inicio"
		},
		{
			name: "Nosotros",
			href: "#nosotros"
		},
		{
			name: "Menú",
			href: "#menu"
		},
		{
			name: "Noticias",
			href: "#noticias"
		},
		{
			name: "Contacto",
			href: "#contacto"
		}
	];
	const scrollToSection = (href) => {
		const element = document.querySelector(href);
		if (element) element.scrollIntoView({ behavior: "smooth" });
		setIsMobileMenuOpen(false);
	};
	return /* @__PURE__ */ jsx("header", {
		className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-custom mx-auto px-4 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [
					/* @__PURE__ */ jsxs("a", {
						href: "#inicio",
						onClick: (e) => {
							e.preventDefault();
							scrollToSection("#inicio");
						},
						className: "flex items-center gap-3 group",
						children: [/* @__PURE__ */ jsx("img", {
							src: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004528/logo_y57zko.png",
							alt: "Maiz Tostao Logo",
							className: `w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110 ${isScrolled ? "drop-shadow-md" : ""}`
						}), /* @__PURE__ */ jsxs("div", {
							className: `hidden sm:block transition-colors duration-300 ${isScrolled ? "text-gray-900" : "text-white"}`,
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-serif font-bold text-lg leading-tight",
								children: "Maíz Tostao"
							}), /* @__PURE__ */ jsx("span", {
								className: "block text-xs uppercase tracking-wider opacity-80",
								children: "Restaurante"
							})]
						})]
					}),
					/* @__PURE__ */ jsx("nav", {
						className: "hidden lg:flex items-center gap-8",
						children: navLinks.map((link) => /* @__PURE__ */ jsxs("a", {
							href: link.href,
							onClick: (e) => {
								e.preventDefault();
								scrollToSection(link.href);
							},
							className: `text-sm font-medium transition-all duration-300 hover:text-[#E6B800] relative group ${isScrolled ? "text-gray-700" : "text-white"}`,
							children: [link.name, /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E6B800] transition-all duration-300 group-hover:w-full" })]
						}, link.name))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "hidden lg:flex items-center gap-4",
						children: /* @__PURE__ */ jsxs("a", {
							href: "tel:+573127528524",
							className: "btn-primary flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }), "Llámanos"]
						})
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
						className: `lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-gray-900" : "text-white"}`,
						"aria-label": "Abrir menú",
						children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: `lg:hidden overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"}`,
				children: /* @__PURE__ */ jsxs("nav", {
					className: "bg-white rounded-2xl shadow-xl p-6 space-y-4",
					children: [navLinks.map((link) => /* @__PURE__ */ jsx("a", {
						href: link.href,
						onClick: (e) => {
							e.preventDefault();
							scrollToSection(link.href);
						},
						className: "block text-gray-700 font-medium py-2 hover:text-[#E6B800] transition-colors",
						children: link.name
					}, link.name)), /* @__PURE__ */ jsxs("a", {
						href: "tel:+573127528524",
						className: "btn-primary flex items-center justify-center gap-2 w-full mt-4",
						children: [/* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }), "Llámanos"]
					})]
				})
			})]
		})
	});
};
//#endregion
//#region src/components/ReservationModal.tsx
var SERVICES = [
	{
		id: "sin-decoracion",
		name: "Sin decoración",
		description: "Reserva tu mesa sin decoración adicional. Solo ven y disfruta de nuestra cocina.",
		price: 0,
		images: ["https://res.cloudinary.com/dwhbqktyy/image/upload/v1777863516/WhatsApp_Image_2026-05-03_at_21.28.34_1_owppfe.jpg"],
		celebrantLabel: "",
		icon: ""
	},
	{
		id: "cumpleaños",
		name: "Feliz cumpleaños Sencilla",
		description: "Globos en helio, banner personalizado, Individuales, montaje de la mesa, 1 postre de cumpleaños y ruleta ganadora.",
		price: 4e4,
		images: [
			"https://res.cloudinary.com/dwhbqktyy/image/upload/v1777859860/WhatsApp_Image_2026-05-01_at_17.18.54_vuqjsr.jpg",
			"https://res.cloudinary.com/dwhbqktyy/image/upload/v1777859860/WhatsApp_Image_2026-05-01_at_17.18.54_1_ubzhiu.jpg",
			"https://res.cloudinary.com/dwhbqktyy/image/upload/v1777859860/WhatsApp_Image_2026-05-01_at_17.18.54_2_qii9ni.jpg"
		],
		celebrantLabel: "¿Quién cumple años?",
		icon: ""
	},
	{
		id: "grado",
		name: "Feliz cumpleaños con petalos",
		description: "Globos en helio, petalos de rosas, banner personalizado, Individuales, montaje de la mesa, 1 postre de cumpleaños y ruleta ganadora.",
		price: 5e4,
		images: ["https://res.cloudinary.com/dwhbqktyy/image/upload/v1777863515/WhatsApp_Image_2026-05-03_at_21.25.46_oggdw4.jpg", "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777863516/WhatsApp_Image_2026-05-03_at_21.24.51_unnknz.jpg"],
		celebrantLabel: "¿Quién cumple años?",
		icon: ""
	},
	{
		id: "aniversario",
		name: "Feliz Aniversario",
		description: "Globos en helio, velas decorativas, banner personalizado, letrero LOVE, decoración romántica para la ocasión.",
		price: 4e4,
		images: ["https://res.cloudinary.com/dwhbqktyy/image/upload/v1777859860/WhatsApp_Image_2026-05-01_at_17.18.53_vidaf4.jpg", "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777859860/WhatsApp_Image_2026-05-03_at_20.48.27_mz6noi.jpg"],
		celebrantLabel: "¿Nombres de los festejados?",
		icon: ""
	},
	{
		id: "bautizo",
		name: "Bautizo",
		description: "Globos en helio, centros de mesa con velas decoracivas, banner personalizado, individuales y detalles en blanco y dorado.",
		price: 4e4,
		images: ["https://res.cloudinary.com/dwhbqktyy/image/upload/v1777860630/WhatsApp_Image_2026-05-03_at_20.48.27_1_dimsec.jpg", "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777860631/WhatsApp_Image_2026-05-03_at_20.48.27_2_dlsfbm.jpg"],
		celebrantLabel: "¿Nombre del bautizado/a?",
		icon: ""
	}
];
var PAYMENT_METHODS = [
	{
		name: "Bre-B",
		number: "300 635 8466",
		logo: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1778206897/Bre-B-logo_uxw4ev.png"
	},
	{
		name: "Nequi",
		number: "310 263 8937",
		logo: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1778206897/logo_nequi_dlqi2k.png"
	},
	{
		name: "Bancolombia",
		number: "912 527 354 41",
		logo: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1778206897/bancolombia-logo_esct9k.png"
	}
];
var TIME_SLOTS = [
	"12:00 PM",
	"12:30 PM",
	"1:00 PM",
	"1:30 PM",
	"2:00 PM",
	"2:30 PM",
	"3:00 PM",
	"5:00 PM",
	"5:30 PM",
	"6:00 PM",
	"6:30 PM",
	"7:00 PM"
];
var STEPS = [
	"Servicio",
	"Fecha y hora",
	"Información",
	"Confirmación"
];
var MONTH_NAMES = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre"
];
var DAY_NAMES = [
	"D",
	"L",
	"M",
	"X",
	"J",
	"V",
	"S"
];
var Lightbox = ({ images, startIndex, onClose }) => {
	const [idx, setIdx] = useState(startIndex);
	const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
	const next = () => setIdx((i) => (i + 1) % images.length);
	useEffect(() => {
		const handler = (e) => {
			if (e.key === "ArrowLeft") prev();
			if (e.key === "ArrowRight") next();
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "fixed inset-0 z-[60] flex items-center justify-center",
		style: { backgroundColor: "rgba(0,0,0,0.95)" },
		onClick: onClose,
		children: [
			/* @__PURE__ */ jsx("button", {
				onClick: onClose,
				className: "absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10 touch-manipulation",
				children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-white" })
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "absolute top-5 left-4 text-white/50 text-sm font-medium",
				children: [
					idx + 1,
					" / ",
					images.length
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative max-w-3xl w-full mx-4",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ jsx("img", {
					src: images[idx],
					alt: `Foto ${idx + 1}`,
					className: "w-full max-h-[80svh] object-contain rounded-2xl"
				}), images.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
					onClick: prev,
					className: "absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors touch-manipulation",
					children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5 text-white" })
				}), /* @__PURE__ */ jsx("button", {
					onClick: next,
					className: "absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors touch-manipulation",
					children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 text-white" })
				})] })]
			}),
			images.length > 1 && /* @__PURE__ */ jsx("div", {
				className: "absolute bottom-5 flex gap-2",
				children: images.map((_, i) => /* @__PURE__ */ jsx("button", {
					onClick: (e) => {
						e.stopPropagation();
						setIdx(i);
					},
					className: `h-2 rounded-full transition-all touch-manipulation ${i === idx ? "bg-[#E6B800] w-6" : "bg-white/40 w-2"}`
				}, i))
			})
		]
	});
};
var GalleryStrip = ({ images, onOpen }) => /* @__PURE__ */ jsxs("div", {
	className: "bg-gray-50 rounded-xl p-3 border border-gray-100",
	children: [/* @__PURE__ */ jsxs("p", {
		className: "text-xs text-gray-400 font-medium mb-2 flex items-center gap-1.5",
		children: [/* @__PURE__ */ jsx(ZoomIn, { className: "w-3.5 h-3.5" }), " Fotos de la decoración — toca para ver en grande"]
	}), /* @__PURE__ */ jsx("div", {
		className: "flex gap-2 overflow-x-auto pb-1",
		style: { scrollbarWidth: "none" },
		children: images.map((src, i) => /* @__PURE__ */ jsxs("button", {
			onClick: () => onOpen(i),
			className: "relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden group ring-2 ring-transparent hover:ring-[#E6B800] transition-all duration-200 touch-manipulation",
			children: [/* @__PURE__ */ jsx("img", {
				src,
				alt: "",
				className: "w-full h-full object-cover"
			}), /* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 bg-black/0 group-hover:bg-black/25 group-active:bg-black/25 transition-colors flex items-center justify-center",
				children: /* @__PURE__ */ jsx(ZoomIn, { className: "w-5 h-5 text-white opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity drop-shadow-lg" })
			})]
		}, i))
	})]
});
var MiniCalendar = ({ selected, onSelect }) => {
	const today = /* @__PURE__ */ new Date();
	const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
	const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
	const firstDay = new Date(view.getFullYear(), view.getMonth(), 1).getDay();
	const days = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
	const isDisabled = (day) => {
		const d = new Date(view.getFullYear(), view.getMonth(), day);
		d.setHours(0, 0, 0, 0);
		const t = /* @__PURE__ */ new Date();
		t.setHours(0, 0, 0, 0);
		return d < t;
	};
	const isSelected = (day) => !!selected && selected.getDate() === day && selected.getMonth() === view.getMonth() && selected.getFullYear() === view.getFullYear();
	const isToday = (day) => today.getDate() === day && today.getMonth() === view.getMonth() && today.getFullYear() === view.getFullYear();
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-gray-50 rounded-2xl border border-gray-100 p-3 select-none w-full",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between mb-3",
				children: [
					/* @__PURE__ */ jsx("button", {
						onClick: () => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1)),
						className: "w-9 h-9 flex items-center justify-center rounded-full hover:bg-white active:bg-gray-200 transition-colors touch-manipulation",
						children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4 text-gray-600" })
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "font-semibold text-gray-800 text-sm",
						children: [
							MONTH_NAMES[view.getMonth()],
							" ",
							view.getFullYear()
						]
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1)),
						className: "w-9 h-9 flex items-center justify-center rounded-full hover:bg-white active:bg-gray-200 transition-colors touch-manipulation",
						children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-gray-600" })
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-7 mb-1",
				children: DAY_NAMES.map((d) => /* @__PURE__ */ jsx("div", {
					className: "text-center text-xs text-gray-400 font-semibold py-1",
					children: d
				}, d))
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-7",
				children: days.map((day, i) => /* @__PURE__ */ jsx("div", {
					className: "flex items-center justify-center py-0.5",
					children: day === null ? /* @__PURE__ */ jsx("div", { className: "w-9 h-9" }) : /* @__PURE__ */ jsx("button", {
						onClick: () => !isDisabled(day) && onSelect(new Date(view.getFullYear(), view.getMonth(), day)),
						disabled: isDisabled(day),
						className: [
							"w-9 h-9 rounded-full text-sm font-medium transition-all duration-150 touch-manipulation",
							isSelected(day) ? "bg-[#E6B800] text-white shadow-md" : "",
							isToday(day) && !isSelected(day) ? "border-2 border-[#E6B800] text-[#E6B800] font-bold" : "",
							!isSelected(day) && !isDisabled(day) && !isToday(day) ? "text-gray-700 hover:bg-[#E6B800]/15 active:bg-[#E6B800]/20" : "",
							isDisabled(day) ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"
						].filter(Boolean).join(" "),
						children: day
					})
				}, i))
			})
		]
	});
};
var ReservationModal = ({ onClose }) => {
	const [step, setStep] = useState(0);
	const [selectedService, setSelectedService] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [copied, setCopied] = useState(null);
	const [mounted, setMounted] = useState(false);
	const [lightbox, setLightbox] = useState(null);
	const [formData, setFormData] = useState({
		celebrantName: "",
		reservantName: "",
		phone: "",
		guests: 2,
		notes: ""
	});
	const bodyRef = useRef(null);
	useEffect(() => {
		bodyRef.current?.scrollTo({ top: 0 });
	}, [step]);
	useEffect(() => {
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const t = setTimeout(() => setMounted(true), 15);
		return () => {
			clearTimeout(t);
			document.body.style.overflow = prev;
		};
	}, []);
	const sinDeco = selectedService?.id === "sin-decoracion";
	const canNext = () => {
		if (step === 0) return !!selectedService;
		if (step === 1) return !!selectedDate && !!selectedTime;
		if (step === 2) {
			if (sinDeco) return formData.reservantName.trim() !== "";
			return formData.celebrantName.trim() !== "" && formData.reservantName.trim() !== "" && formData.phone.trim() !== "";
		}
		return true;
	};
	const formatDate = (d) => {
		return `${[
			"Domingo",
			"Lunes",
			"Martes",
			"Miércoles",
			"Jueves",
			"Viernes",
			"Sábado"
		][d.getDay()]}, ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]} de ${d.getFullYear()}`;
	};
	const copyNumber = (text, key) => {
		navigator.clipboard.writeText(text.replace(/\s/g, ""));
		setCopied(key);
		setTimeout(() => setCopied(null), 2e3);
	};
	const openWhatsApp = () => {
		const lines = [
			"¡Hola Maiz Tostao! ",
			"",
			sinDeco ? "Quisiera confirmar una reserva de mesa:" : "Adjunto comprobante de pago para reserva con decoración:",
			"",
			`Fecha: ${selectedDate ? formatDate(selectedDate) : ""}`,
			`Hora: ${selectedTime}`,
			`Servicio: ${selectedService?.icon} ${selectedService?.name}`,
			...!sinDeco && formData.celebrantName ? [`Celebrado/a: ${formData.celebrantName}`] : [],
			`Reserva a nombre de: ${formData.reservantName}`,
			`Comensales: ${formData.guests}`,
			...!sinDeco ? [`Decoración: $${selectedService?.price.toLocaleString("es-CO")} COP`] : [],
			...formData.notes?.trim() ? [`Notas: ${formData.notes.trim()}`] : []
		];
		window.open(`https://wa.me/573127528524?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
	};
	const stepTitles = [
		"Elige tu decoración",
		"Fecha y hora",
		"Tus datos",
		sinDeco ? "Confirma tu reserva" : "Confirma y paga"
	];
	const renderStep = () => {
		if (step === 0) return /* @__PURE__ */ jsx("div", {
			className: "space-y-3",
			children: SERVICES.map((service) => {
				const active = selectedService?.id === service.id;
				return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("button", {
					onClick: () => setSelectedService(service),
					className: ["w-full text-left rounded-2xl border-2 overflow-hidden transition-all duration-200 touch-manipulation block", active ? "border-[#E6B800] shadow-md" : "border-gray-100 hover:border-gray-200"].join(" "),
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative h-28 sm:h-32 overflow-hidden",
						children: [
							/* @__PURE__ */ jsx("img", {
								src: service.images[0],
								alt: service.name,
								className: "w-full h-full object-cover transition-transform duration-500"
							}),
							/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" }),
							/* @__PURE__ */ jsxs("div", {
								className: "absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "text-xl",
									children: service.icon
								}), /* @__PURE__ */ jsx("p", {
									className: "font-bold text-white text-sm sm:text-base leading-tight mt-0.5",
									children: service.name
								})] }), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [service.images.length > 1 && /* @__PURE__ */ jsxs("span", {
										className: "text-xs text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full",
										children: [service.images.length, " fotos"]
									}), /* @__PURE__ */ jsx("div", {
										className: ["w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all", active ? "border-[#E6B800] bg-[#E6B800]" : "border-white/60 bg-white/10"].join(" "),
										children: active && /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-white" })
									})]
								})]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: `px-3 py-2.5 flex items-center justify-between gap-2 ${active ? "bg-[#E6B800]/5" : "bg-white"}`,
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-gray-500 text-xs leading-snug line-clamp-1 flex-1",
							children: service.description
						}), /* @__PURE__ */ jsx("span", {
							className: `text-xs font-bold flex-shrink-0 ${active ? "text-[#E6B800]" : "text-gray-400"}`,
							children: service.price === 0 ? "Sin costo" : `$${service.price.toLocaleString("es-CO")}`
						})]
					})]
				}), active && service.images.length > 0 && /* @__PURE__ */ jsx("div", {
					className: "mt-2",
					children: /* @__PURE__ */ jsx(GalleryStrip, {
						images: service.images,
						onOpen: (i) => setLightbox({
							images: service.images,
							index: i
						})
					})
				})] }, service.id);
			})
		});
		if (step === 1) return /* @__PURE__ */ jsxs("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-[#E6B800]" }), /* @__PURE__ */ jsx("span", {
					className: "font-semibold text-gray-800 text-sm",
					children: "Selecciona la fecha"
				})]
			}), /* @__PURE__ */ jsx(MiniCalendar, {
				selected: selectedDate,
				onSelect: (d) => {
					setSelectedDate(d);
					setSelectedTime(null);
				}
			})] }), selectedDate && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-[#E6B800]" }), /* @__PURE__ */ jsx("span", {
					className: "font-semibold text-gray-800 text-sm",
					children: "Selecciona la hora"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-3 sm:grid-cols-4 gap-2",
				children: TIME_SLOTS.map((t) => /* @__PURE__ */ jsx("button", {
					onClick: () => setSelectedTime(t),
					className: ["py-2.5 rounded-xl text-xs font-semibold border-2 transition-all duration-150 touch-manipulation", selectedTime === t ? "border-[#E6B800] bg-[#E6B800] text-white shadow-sm" : "border-gray-100 bg-white text-gray-700 hover:border-[#E6B800]/40 active:bg-gray-50"].join(" "),
					children: t
				}, t))
			})] })]
		});
		if (step === 2) return /* @__PURE__ */ jsxs("div", {
			className: "space-y-4",
			children: [
				!sinDeco && /* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-[#E6B800]",
							children: "* "
						}), selectedService?.celebrantLabel]
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" }), /* @__PURE__ */ jsx("input", {
							type: "text",
							value: formData.celebrantName,
							placeholder: "Nombre completo",
							onChange: (e) => setFormData((f) => ({
								...f,
								celebrantName: e.target.value
							})),
							className: "w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#E6B800] bg-gray-50 transition-colors"
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-[#E6B800]",
							children: "* "
						}), "Nombre de quien reserva"]
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" }), /* @__PURE__ */ jsx("input", {
							type: "text",
							value: formData.reservantName,
							placeholder: "Tu nombre completo",
							onChange: (e) => setFormData((f) => ({
								...f,
								reservantName: e.target.value
							})),
							className: "w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#E6B800] bg-gray-50 transition-colors"
						})]
					})]
				}),
				!sinDeco && /* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-[#E6B800]",
							children: "* "
						}), "Número de celular"]
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" }), /* @__PURE__ */ jsx("input", {
							type: "tel",
							value: formData.phone,
							placeholder: "+57 300 000 0000",
							onChange: (e) => setFormData((f) => ({
								...f,
								phone: e.target.value
							})),
							className: "w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#E6B800] bg-gray-50 transition-colors"
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-[#E6B800]",
							children: "* "
						}), "Número de comensales"]
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx(Users, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" }), /* @__PURE__ */ jsx("select", {
							value: formData.guests,
							onChange: (e) => setFormData((f) => ({
								...f,
								guests: Number(e.target.value)
							})),
							className: "w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#E6B800] bg-gray-50 appearance-none cursor-pointer transition-colors",
							children: Array.from({ length: 19 }, (_, i) => i + 2).map((n) => /* @__PURE__ */ jsxs("option", {
								value: n,
								children: [n, " personas"]
							}, n))
						})]
					})]
				}),
				!sinDeco && /* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block",
						children: "Notas adicionales (opcional)"
					}), /* @__PURE__ */ jsx("textarea", {
						value: formData.notes,
						rows: 3,
						placeholder: "Alergias, peticiones especiales...",
						onChange: (e) => setFormData((f) => ({
							...f,
							notes: e.target.value
						})),
						className: "w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#E6B800] bg-gray-50 resize-none transition-colors"
					})]
				})
			]
		});
		if (step === 3) return /* @__PURE__ */ jsxs("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "rounded-2xl p-4 text-white",
				style: { background: "linear-gradient(135deg,#1a1a1a,#2d1a00)" },
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-[#E6B800] text-xs font-bold uppercase tracking-widest mb-3",
					children: "Resumen de tu reserva"
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [
						[
							{
								label: sinDeco ? "Tipo" : "Decoración",
								value: `${selectedService?.icon} ${selectedService?.name}`
							},
							{
								label: "Fecha",
								value: selectedDate ? formatDate(selectedDate) : "",
								small: true
							},
							{
								label: "Hora",
								value: selectedTime ?? ""
							},
							...!sinDeco && formData.celebrantName ? [{
								label: "Celebrado/a",
								value: formData.celebrantName
							}] : [],
							{
								label: "Reserva a nombre de",
								value: formData.reservantName
							},
							{
								label: "Comensales",
								value: `${formData.guests} personas`
							}
						].map(({ label, value, small }) => /* @__PURE__ */ jsxs("div", {
							className: "flex justify-between items-start gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-white/60 text-xs flex-shrink-0",
								children: label
							}), /* @__PURE__ */ jsx("span", {
								className: `font-medium text-right ${small ? "text-xs" : "text-sm"}`,
								children: value
							})]
						}, label)),
						/* @__PURE__ */ jsx("div", { className: "h-px bg-white/10 my-1" }),
						/* @__PURE__ */ jsxs("div", {
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-white/80 text-sm font-semibold",
								children: "Costo decoración"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-[#E6B800] font-bold text-base",
								children: sinDeco ? "Sin costo" : `$${selectedService?.price.toLocaleString("es-CO")} COP`
							})]
						})
					]
				})]
			}), sinDeco ? /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "bg-green-50 border border-green-200 rounded-xl p-3",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-green-800 text-xs font-semibold mb-1",
						children: "✅ ¡Sin costo adicional!"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-green-700 text-xs leading-relaxed",
						children: "Esta reserva no requiere pago anticipado. Envíanos tus datos por WhatsApp y te confirmamos tu mesa."
					})]
				}),
				/* @__PURE__ */ jsx(WAButton, {
					label: "Confirmar reserva por WhatsApp",
					onClick: openWhatsApp
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-center text-xs text-gray-400",
					children: "Te responderemos confirmando la disponibilidad."
				})
			] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "bg-amber-50 border border-amber-200 rounded-xl p-3",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-amber-800 text-xs font-semibold mb-1",
						children: "⚠️ Pago anticipado requerido"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-amber-700 text-xs leading-relaxed",
						children: "Para garantizar tu reserva realiza el pago de la decoración y envíanos el comprobante por WhatsApp."
					})]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs font-bold text-gray-400 uppercase tracking-wide mb-2",
					children: "Métodos de pago"
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-2",
					children: PAYMENT_METHODS.map((m, idx) => /* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between p-3 bg-white rounded-xl border-2 border-gray-100",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-8 h-8 rounded-lg overflow-hidden flex-shrink-0",
								children: /* @__PURE__ */ jsx("img", {
									src: m.logo,
									alt: m.name,
									className: "w-full h-full object-contain p-1"
								})
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-semibold text-gray-800 text-sm",
								children: m.name
							}), /* @__PURE__ */ jsx("p", {
								className: "text-gray-500 text-xs font-mono",
								children: m.number
							})] })]
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => copyNumber(m.number, m.number + idx),
							className: "flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-[#E6B800] p-2 rounded-lg hover:bg-[#E6B800]/10 transition-colors touch-manipulation",
							children: copied === m.number + idx ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-500" }), /* @__PURE__ */ jsx("span", {
								className: "hidden sm:inline ml-1",
								children: "Copiado"
							})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Copy, { className: "w-4 h-4" }), /* @__PURE__ */ jsx("span", {
								className: "hidden sm:inline ml-1",
								children: "Copiar"
							})] })
						})]
					}, idx))
				})] }),
				/* @__PURE__ */ jsx(WAButton, {
					label: "Enviar comprobante por WhatsApp",
					onClick: openWhatsApp
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-center text-xs text-gray-400",
					children: "Una vez recibido el comprobante confirmamos tu reserva."
				})
			] })]
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
		className: `fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 transition-all duration-300 ${mounted ? "opacity-100" : "opacity-0"}`,
		style: {
			backgroundColor: "rgba(0,0,0,0.7)",
			backdropFilter: "blur(6px)"
		},
		onClick: (e) => e.target === e.currentTarget && onClose(),
		children: /* @__PURE__ */ jsxs("div", {
			className: [
				"relative bg-white flex flex-col overflow-hidden shadow-2xl",
				"w-full rounded-t-3xl sm:rounded-3xl",
				"max-h-[93svh] sm:max-h-[88vh] sm:max-w-2xl",
				"transition-all duration-300",
				mounted ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-10 opacity-0 sm:scale-95"
			].join(" "),
			children: [/* @__PURE__ */ jsx("div", {
				className: "sm:hidden flex justify-center pt-2.5 pb-1 flex-shrink-0",
				children: /* @__PURE__ */ jsx("div", { className: "w-10 h-1 bg-gray-300 rounded-full" })
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-1 overflow-hidden",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "hidden sm:flex w-44 flex-shrink-0 flex-col",
					style: { background: "linear-gradient(160deg,#1a1a1a 0%,#2d1a00 100%)" },
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "p-5 border-b border-white/10 flex-shrink-0",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004528/logo_y57zko.png",
									alt: "Maiz Tostao",
									className: "w-12 h-12 object-contain mb-2"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-white font-bold text-sm",
									children: "Maiz Tostao"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-white/40 text-xs",
									children: "Restaurante"
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex-1 p-4 space-y-1",
							children: STEPS.map((label, i) => {
								const done = i < step;
								const active = i === step;
								return /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 py-2",
									children: [/* @__PURE__ */ jsx("div", {
										className: ["w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all", done ? "bg-[#E6B800] text-white" : active ? "bg-white text-gray-900" : "bg-white/10 text-white/30"].join(" "),
										children: done ? /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" }) : i + 1
									}), /* @__PURE__ */ jsx("span", {
										className: ["text-xs font-medium", active ? "text-[#E6B800]" : done ? "text-white/70" : "text-white/30"].join(" "),
										children: label
									})]
								}, i);
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "p-4 border-t border-white/10 flex-shrink-0",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-white/40 text-xs mb-1",
								children: "¿Tienes preguntas?"
							}), /* @__PURE__ */ jsx("a", {
								href: "https://wa.me/573127528524",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-[#E6B800] text-xs font-medium hover:underline",
								children: "+57 312 752 8524"
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex-1 flex flex-col min-w-0 overflow-hidden",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "sm:hidden flex items-center justify-center gap-1.5 px-4 py-2 flex-shrink-0",
							children: STEPS.map((_, i) => /* @__PURE__ */ jsx("div", { className: ["h-1.5 rounded-full transition-all duration-300", i === step ? "bg-[#E6B800] w-7" : i < step ? "bg-[#E6B800]/50 w-4" : "bg-gray-200 w-4"].join(" ") }, i))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50/80 flex-shrink-0",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "min-w-0 pr-2",
								children: [/* @__PURE__ */ jsxs("p", {
									className: "hidden sm:block text-xs text-gray-400 font-medium uppercase tracking-wide",
									children: [
										"Paso ",
										step + 1,
										" de ",
										STEPS.length
									]
								}), /* @__PURE__ */ jsx("h3", {
									className: "font-bold text-gray-900 text-base sm:text-lg leading-tight truncate",
									children: stepTitles[step]
								})]
							}), /* @__PURE__ */ jsx("button", {
								onClick: onClose,
								className: "w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center transition-colors flex-shrink-0 touch-manipulation",
								children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-gray-600" })
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							ref: bodyRef,
							className: "flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4",
							children: renderStep()
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "px-4 sm:px-5 py-3 border-t border-gray-100 bg-white flex items-center justify-between gap-3 flex-shrink-0",
							children: [step > 0 ? /* @__PURE__ */ jsxs("button", {
								onClick: () => setStep((s) => s - 1),
								className: "flex items-center gap-1.5 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-gray-400 active:bg-gray-50 transition-colors touch-manipulation",
								children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" }), " Atrás"]
							}) : /* @__PURE__ */ jsx("div", {}), step < STEPS.length - 1 ? /* @__PURE__ */ jsxs("button", {
								onClick: () => canNext() && setStep((s) => s + 1),
								disabled: !canNext(),
								className: ["flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 touch-manipulation", canNext() ? "bg-[#E6B800] hover:bg-[#D4A000] active:bg-[#C49000] text-white shadow-md" : "bg-gray-100 text-gray-400 cursor-not-allowed"].join(" "),
								children: ["Siguiente ", /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })]
							}) : /* @__PURE__ */ jsxs("button", {
								onClick: onClose,
								className: "flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700 transition-colors shadow-md touch-manipulation",
								children: [/* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }), " Finalizar"]
							})]
						})
					]
				})]
			})]
		})
	}), lightbox && /* @__PURE__ */ jsx(Lightbox, {
		images: lightbox.images,
		startIndex: lightbox.index,
		onClose: () => setLightbox(null)
	})] });
};
var WAButton = ({ label, onClick }) => /* @__PURE__ */ jsxs("button", {
	onClick,
	className: "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 touch-manipulation",
	style: { background: "linear-gradient(135deg,#25D366,#128C7E)" },
	children: [/* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5" }), label]
});
//#endregion
//#region src/hooks/useHydrated.ts
/**
* Devuelve `true` únicamente después de que React haya hidratado el DOM en el cliente.
*
* En el servidor (SSR) siempre devuelve `false`, lo que permite renderizar
* el contenido completamente visible sin clases de animación.
* Una vez que JS carga y el componente se monta, retorna `true` y
* las animaciones pueden activarse normalmente.
*/
function useHydrated() {
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		setHydrated(true);
	}, []);
	return hydrated;
}
//#endregion
//#region src/sections/Hero.tsx
var Hero = () => {
	const [showModal, setShowModal] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const heroRef = useRef(null);
	const hydrated = useHydrated();
	useEffect(() => {
		setIsVisible(true);
	}, []);
	const scrollToSection = (href) => {
		const element = document.querySelector(href);
		if (element) element.scrollIntoView({ behavior: "smooth" });
	};
	return /* @__PURE__ */ jsxs("section", {
		id: "inicio",
		ref: heroRef,
		className: "relative min-h-screen flex items-center justify-center overflow-hidden",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "absolute inset-0",
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 bg-cover bg-center bg-no-repeat scale-105",
					style: { backgroundImage: `url('https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004357/lomo-saltado-1_jyuvo1.jpg')` }
				}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" })]
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 w-32 h-32 border border-[#E6B800]/30 rounded-full animate-float opacity-50" }),
			/* @__PURE__ */ jsx("div", { className: "absolute bottom-40 right-20 w-24 h-24 border border-[#E6B800]/20 rounded-full animate-float animation-delay-400 opacity-40" }),
			/* @__PURE__ */ jsx("div", { className: "absolute top-1/3 right-1/4 w-16 h-16 border border-white/10 rounded-full animate-float animation-delay-800 opacity-30" }),
			/* @__PURE__ */ jsx("div", {
				className: "relative z-10 container-custom mx-auto px-4 sm:px-6 lg:px-8 text-center",
				children: /* @__PURE__ */ jsxs("div", {
					className: hydrated ? `transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}` : "",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8",
							children: [/* @__PURE__ */ jsx(Utensils, { className: "w-4 h-4 text-[#E6B800]" }), /* @__PURE__ */ jsx("span", {
								className: "text-white/90 text-sm font-medium",
								children: "Cocina de Autor Santandereana - Peruana"
							})]
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight",
							children: [/* @__PURE__ */ jsx("span", {
								className: "block",
								children: "Maíz Tostao"
							}), /* @__PURE__ */ jsx("span", {
								className: "block text-[#E6B800] mt-2",
								children: "Restaurante"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xl sm:text-2xl md:text-3xl text-white/90 font-light italic mb-4",
							children: "\"Lo mejor Está Por Servirse\""
						}),
						/* @__PURE__ */ jsx("p", {
							className: "max-w-2xl mx-auto text-white/70 text-base sm:text-lg mb-10 leading-relaxed",
							children: "Descubre la fusión única de sabores tradicionales santandereanos y peruanos, elaborados con pasión y autenticidad en cada plato."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-16",
							children: [/* @__PURE__ */ jsxs("button", {
								onClick: () => scrollToSection("#menu"),
								className: "btn-primary flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ jsx(Utensils, { className: "w-5 h-5" }), "Ver Menú"]
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => setShowModal(true),
								className: "btn-secondary text-base",
								children: "Reservar Mesa"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => scrollToSection("#nosotros"),
				className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-[#E6B800] transition-colors animate-bounce",
				"aria-label": "Desplazar hacia abajo",
				children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-8 h-8" })
			}),
			showModal && /* @__PURE__ */ jsx(ReservationModal, { onClose: () => setShowModal(false) })
		]
	});
};
//#endregion
//#region src/sections/About.tsx
var About = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const sectionRef = useRef(null);
	const videoRef = useRef(null);
	const hydrated = useHydrated();
	const anim = (visible, extra = "") => hydrated ? `transition-all duration-700 ${extra} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}` : extra;
	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	};
	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
				observer.disconnect();
			}
		}, { threshold: .2 });
		if (sectionRef.current) observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);
	const values = [
		{
			icon: Heart,
			title: "Pasión",
			description: "Cada plato es preparado con amor y dedicación."
		},
		{
			icon: Star,
			title: "Calidad",
			description: "Ingredientes frescos y de la más alta calidad."
		},
		{
			icon: Target,
			title: "Tradición",
			description: "Rescatamos los sabores auténticos de nuestra tierra."
		}
	];
	return /* @__PURE__ */ jsxs("section", {
		id: "nosotros",
		ref: sectionRef,
		className: "section-padding bg-white relative overflow-hidden",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-[#E6B800]/5 rounded-full -translate-y-1/2 translate-x-1/2" }),
			/* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-[#E6B800]/5 rounded-full translate-y-1/2 -translate-x-1/2" }),
			/* @__PURE__ */ jsxs("div", {
				className: "container-custom mx-auto relative z-10",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: anim(isVisible, "text-center mb-16"),
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "inline-block text-[#E6B800] text-sm font-semibold uppercase tracking-widest mb-4",
								children: "Conócenos"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6",
								children: "Somos más que un restaurante"
							}),
							/* @__PURE__ */ jsx("div", { className: "w-24 h-1 gold-gradient mx-auto rounded-full" })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20",
						children: [/* @__PURE__ */ jsx("div", {
							className: hydrated ? `relative transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}` : "relative",
							children: /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "relative rounded-2xl overflow-hidden shadow-2xl",
									children: [
										/* @__PURE__ */ jsxs("video", {
											ref: videoRef,
											className: "w-full h-[650px] object-cover",
											autoPlay: true,
											loop: true,
											muted: true,
											playsInline: true,
											poster: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004357/lomo-saltado-1_jyuvo1.jpg",
											children: [/* @__PURE__ */ jsx("source", {
												src: "https://res.cloudinary.com/dwhbqktyy/video/upload/v1776996636/SaveClip.App_AQPBCTjjuiOuX9ss9krkCD_wHQfEeuD2clA1MxTYWHu_F_g7GxLNz2GbXMy83Kmcqc5Gjz3yeZVpfRediApCNh6B_x6le6v.mp4",
												type: "video/mp4"
											}), "Tu navegador no soporta video."]
										}),
										/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" }),
										/* @__PURE__ */ jsxs("button", {
											onClick: toggleMute,
											"aria-label": isMuted ? "Activar audio" : "Silenciar audio",
											className: "absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium hover:bg-black/70 active:scale-95 transition-all duration-200 group",
											children: [isMuted ? /* @__PURE__ */ jsx(VolumeX, { className: "w-4 h-4 text-white/80 group-hover:text-white" }) : /* @__PURE__ */ jsx(Volume2, { className: "w-4 h-4 text-[#E6B800]" }), /* @__PURE__ */ jsx("span", {
												className: "hidden sm:inline",
												children: isMuted ? "Sin audio" : "Con audio"
											})]
										})
									]
								}), /* @__PURE__ */ jsx("div", { className: "absolute -top-4 -left-4 w-full h-full border-2 border-[#E6B800]/30 rounded-2xl -z-10" })]
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: hydrated ? `transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}` : "",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "mb-10",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3 mb-4",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-12 h-12 rounded-xl gold-gradient flex items-center justify-center",
											children: /* @__PURE__ */ jsx(Target, { className: "w-6 h-6 text-white" })
										}), /* @__PURE__ */ jsx("h3", {
											className: "font-serif text-2xl font-bold text-gray-900",
											children: "Nuestra Misión"
										})]
									}), /* @__PURE__ */ jsx("p", {
										className: "text-gray-600 leading-relaxed text-lg",
										children: "Somos una empresa dedicada a rescatar los sabores tradicionales santandereanos y peruanos fusionándolos a través de la cocina de autor, con el sabor y autenticidad que nos representa, ofreciéndoles a los clientes platos únicos que transmiten nuestra pasión por este arte."
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mb-10",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3 mb-4",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-12 h-12 rounded-xl gold-gradient flex items-center justify-center",
											children: /* @__PURE__ */ jsx(Eye, { className: "w-6 h-6 text-white" })
										}), /* @__PURE__ */ jsx("h3", {
											className: "font-serif text-2xl font-bold text-gray-900",
											children: "Nuestra Visión"
										})]
									}), /* @__PURE__ */ jsx("p", {
										className: "text-gray-600 leading-relaxed text-lg",
										children: "Ser reconocidos como un referente gastronómico en Santander y Colombia, por nuestra autenticidad en la cocina de autor que enaltece la tradición santandereana y peruana. Queremos consolidarnos como un espacio donde cada plato sea una experiencia inolvidable, generando orgullo cultural, satisfacción plena en nuestros clientes y un impacto positivo en la comunidad."
									})]
								}),
								/* @__PURE__ */ jsx("a", {
									href: "#contacto",
									onClick: (e) => {
										e.preventDefault();
										document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
									},
									className: "btn-primary inline-flex items-center gap-2",
									children: "Conoce más de nosotros"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: anim(isVisible, "grid md:grid-cols-3 gap-8 delay-600"),
						children: values.map((value, index) => /* @__PURE__ */ jsxs("div", {
							className: "group bg-gray-50 rounded-2xl p-8 text-center hover:bg-white hover:shadow-xl transition-all duration-500 card-hover",
							style: { animationDelay: `${index * 100}ms` },
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300",
									children: /* @__PURE__ */ jsx(value.icon, { className: "w-8 h-8 text-white" })
								}),
								/* @__PURE__ */ jsx("h4", {
									className: "font-serif text-xl font-bold text-gray-900 mb-3",
									children: value.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-gray-600",
									children: value.description
								})
							]
						}, value.title))
					})
				]
			})
		]
	});
};
//#endregion
//#region src/sections/FeaturedDishes.tsx
var FeaturedDishes = () => {
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef(null);
	const hydrated = useHydrated();
	const anim = (vis, base = "", delay = "") => hydrated ? `${base} transition-all duration-700 ${delay} ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`.trim() : base;
	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
				observer.disconnect();
			}
		}, { threshold: .1 });
		if (sectionRef.current) observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);
	const dishes = [
		{
			name: "Recomendado de la casa",
			description: "Medallones de lomo fino de res en salsa teriyaki con crocantes de tocineta, acompanado de fetuccini a la huancaina y chips de papa nativa.",
			image: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777263248/plato1_ak4l0m.jpg",
			tags: ["Peruano", "Especialidad"],
			icon: Flame
		},
		{
			name: "Mute Santandereano",
			description: "Sopa ancestral de los andes, elaborada con maiz pelado, carnes seleccionadas, vegetales y guacas cocinados en fogón de leña, acompañado de arroz, yuca al vapor y arepa santandereana.",
			image: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004693/mute_goxzwt.jpg",
			tags: ["Santandereano", "Tradicional"],
			icon: ChefHat
		},
		{
			name: "Picada Típica",
			description: "Carne oreada y fresca, 1/2 pierna pernil, aletilla, chorizos en melado, rellena, acompañado de yuca al vapor, papa criolla y arepa santandereana.",
			image: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1776995857/SaveClip.App_649238507_17902694679220833_3216721949678016871_n_tsiin4.jpg",
			tags: ["Santandereano", "Tradicional"],
			icon: Leaf
		},
		{
			name: "Parrillada de mariscos",
			description: "Pescado y aros de calamar apanados, palmitos y brochetas de camarón a la brasa, tentáculos de pulpo en salsa de la casa y coctel de camaron, acompañado de papa criolla, ensalada y chips de platano.",
			image: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1776994060/WhatsApp_Image_2026-04-23_at_20.20.42_dbsle4.jpg",
			tags: ["Fusion", "Especialidad"],
			icon: Star
		}
	];
	return /* @__PURE__ */ jsxs("section", {
		id: "menu",
		ref: sectionRef,
		className: "section-padding bg-gray-900 relative overflow-hidden",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 opacity-5",
				children: /* @__PURE__ */ jsx("div", {
					className: "absolute inset-0",
					style: {
						backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
						backgroundSize: "40px 40px"
					}
				})
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 w-64 h-64 bg-[#E6B800]/10 rounded-full blur-3xl" }),
			/* @__PURE__ */ jsx("div", { className: "absolute bottom-20 right-10 w-80 h-80 bg-[#E6B800]/5 rounded-full blur-3xl" }),
			/* @__PURE__ */ jsxs("div", {
				className: "container-custom mx-auto relative z-10",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: anim(isVisible, "text-center mb-16"),
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "inline-block text-[#E6B800] text-sm font-semibold uppercase tracking-widest mb-4",
								children: "Nuestro Menu"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6",
								children: "Platos Destacados"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "max-w-2xl mx-auto text-white/70 text-lg",
								children: "Descubre nuestra seleccion de platos mas populares, preparados con los mejores ingredientes y la pasion que nos caracteriza."
							}),
							/* @__PURE__ */ jsx("div", { className: "w-24 h-1 gold-gradient mx-auto rounded-full mt-6" })
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12",
						children: dishes.map((dish, index) => /* @__PURE__ */ jsxs("div", {
							className: hydrated ? `group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#E6B800]/50 transition-all duration-500 card-hover flex flex-col ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}` : "group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#E6B800]/50 transition-all duration-500 card-hover flex flex-col",
							style: { transitionDelay: `${index * 100 + 200}ms` },
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative h-48 overflow-hidden flex-shrink-0",
								children: [
									/* @__PURE__ */ jsx("img", {
										src: dish.image,
										alt: dish.name,
										className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
									}),
									/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" }),
									/* @__PURE__ */ jsx("div", {
										className: "absolute top-3 left-3 flex gap-2",
										children: dish.tags.map((tag) => /* @__PURE__ */ jsx("span", {
											className: "px-2 py-1 bg-[#E6B800] text-white text-xs font-medium rounded-full",
											children: tag
										}, tag))
									}),
									/* @__PURE__ */ jsx("div", {
										className: "absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center",
										children: /* @__PURE__ */ jsx(dish.icon, { className: "w-5 h-5 text-white" })
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-6 flex flex-col flex-1",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "font-serif text-xl font-bold text-white group-hover:text-[#E6B800] transition-colors mb-3",
										children: dish.name
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-white/60 text-sm leading-relaxed flex-1 mb-4",
										children: dish.description
									}),
									/* @__PURE__ */ jsx("a", {
										href: `https://wa.me/573127528524?text=${encodeURIComponent(`¡Hola buen día! 😊 Quisiera ordenar el *${dish.name}*. ¿Me podrían dar más información?`)}`,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "w-full py-2 border border-white/20 rounded-lg text-white/80 text-sm font-medium hover:bg-[#E6B800] hover:border-[#E6B800] hover:text-white transition-all duration-300 mt-auto text-center block",
										children: "Ordenar"
									})
								]
							})]
						}, dish.name))
					}),
					/* @__PURE__ */ jsx("div", {
						className: anim(isVisible, "text-center", "delay-700"),
						children: /* @__PURE__ */ jsxs("a", {
							href: "/Docs/Carta.pdf",
							download: true,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "btn-primary inline-flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(ChefHat, { className: "w-5 h-5" }), "Ver la carta"]
						})
					})
				]
			})
		]
	});
};
//#endregion
//#region src/sections/News.tsx
var News = () => {
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef(null);
	const hydrated = useHydrated();
	const anim = (vis, base = "", delay = "") => hydrated ? `${base} transition-all duration-700 ${delay} ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`.trim() : base;
	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
				observer.disconnect();
			}
		}, { threshold: .1 });
		if (sectionRef.current) observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);
	const news = [
		{
			title: "Burguer Fest 2026",
			description: "Una experiencia que reúne lo mejor de nuestra cocina, identidad y sabor.",
			date: "18 - 26 Abril 2026",
			image: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1776998408/SaveClip.App_670750891_18077010872280498_5378731961807402164_n_ps6aae.jpg",
			link: "https://www.instagram.com/reel/DWytw_cjqYC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
			featured: true
		},
		{
			title: "Expo Turismo 2025",
			description: "Un evento especial donde celebramos la fusión de la cocina santandereana y peruana en una experiencia única.",
			date: "31 Mayo 2025",
			image: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777003455/SaveClip.App_533118353_18190583434316616_6957001046809440780_n_mrgecw.jpg",
			link: "https://www.instagram.com/reel/DNTCoT7tch1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
			featured: false
		},
		{
			title: "Un pedacito de historia",
			description: "Descubre los orígenes de nuestros platos más emblemáticos y la historia detrás de cada receta.",
			date: null,
			image: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777001775/SaveClip.App_524651681_765827495811133_7384363894445476023_n_rdeqfs.jpg",
			link: "https://www.instagram.com/reel/DNTCoT7tch1/",
			featured: false
		},
		{
			title: "2 Tierras, Una Mesa",
			description: "Un evento especial donde celebramos la fusión de la cocina santandereana y peruana en una experiencia única.",
			date: "31 Mayo 2025",
			image: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777003572/SaveClip.App_523476142_18041578511644100_2848167722203951464_n_c5wp5y.webp",
			link: "https://www.instagram.com/p/DMbvyZKMdou/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
			featured: false
		}
	];
	return /* @__PURE__ */ jsxs("section", {
		id: "noticias",
		ref: sectionRef,
		className: "section-padding bg-white relative overflow-hidden",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent" }),
			/* @__PURE__ */ jsx("div", { className: "absolute top-40 right-0 w-72 h-72 bg-[#E6B800]/5 rounded-full translate-x-1/2" }),
			/* @__PURE__ */ jsxs("div", {
				className: "container-custom mx-auto relative z-10",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: anim(isVisible, "flex flex-col md:flex-row md:items-end md:justify-between mb-16"),
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
							className: "inline-block text-[#E6B800] text-sm font-semibold uppercase tracking-widest mb-4",
							children: "Novedades"
						}), /* @__PURE__ */ jsx("h2", {
							className: "font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900",
							children: "Noticias & Eventos"
						})] }), /* @__PURE__ */ jsxs("a", {
							href: "https://www.instagram.com/maiz_tostao_restaurante/",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "mt-6 md:mt-0 inline-flex items-center gap-2 text-[#E6B800] font-medium hover:gap-3 transition-all",
							children: ["Ver todas las novedades", /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: anim(isVisible, "mb-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center", "delay-300"),
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "font-serif text-2xl md:text-3xl font-bold text-white mb-4",
								children: "¿Deseas realizar un evento?"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-white/70 mb-8 max-w-xl mx-auto",
								children: "Tenemos opciones especiales para celebraciones, reuniones corporativas y eventos privados. Descarga nuestro menú especial para eventos."
							}),
							/* @__PURE__ */ jsxs("a", {
								href: "/Docs/MENÚ EVENTOS 2026.pdf",
								download: true,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "btn-primary inline-flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(ExternalLink, { className: "w-5 h-5" }), "Descargar Menú de Eventos"]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid lg:grid-cols-2 gap-8",
						children: [/* @__PURE__ */ jsx("div", {
							className: hydrated ? `group relative rounded-2xl overflow-hidden shadow-xl transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}` : "group relative rounded-2xl overflow-hidden shadow-xl",
							children: /* @__PURE__ */ jsxs("div", {
								className: "relative h-full min-h-[400px] lg:min-h-[500px]",
								children: [
									/* @__PURE__ */ jsx("img", {
										src: news[0].image,
										alt: news[0].title,
										className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
									}),
									/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" }),
									/* @__PURE__ */ jsxs("div", {
										className: "absolute bottom-0 left-0 right-0 p-8",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2 mb-4",
												children: [/* @__PURE__ */ jsx("span", {
													className: "px-3 py-1 bg-[#E6B800] text-white text-xs font-semibold rounded-full",
													children: "Destacado"
												}), /* @__PURE__ */ jsxs("span", {
													className: "flex items-center gap-1 text-white/80 text-sm",
													children: [/* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }), news[0].date]
												})]
											}),
											/* @__PURE__ */ jsx("h3", {
												className: "font-serif text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#E6B800] transition-colors",
												children: news[0].title
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-white/80 mb-6 line-clamp-2",
												children: news[0].description
											}),
											/* @__PURE__ */ jsxs("a", {
												href: news[0].link,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "inline-flex items-center gap-2 text-white font-medium hover:text-[#E6B800] transition-colors",
												children: ["Ver más", /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" })]
											})
										]
									})
								]
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-6",
							children: news.slice(1).map((item, index) => /* @__PURE__ */ jsx("div", {
								className: hydrated ? `group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 card-hover ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}` : "group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 card-hover",
								style: { transitionDelay: `${(index + 1) * 200 + 200}ms` },
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col sm:flex-row",
									children: [/* @__PURE__ */ jsx("div", {
										className: "sm:w-2/5 h-48 sm:h-auto relative overflow-hidden",
										children: /* @__PURE__ */ jsx("img", {
											src: item.image,
											alt: item.title,
											className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
										})
									}), /* @__PURE__ */ jsxs("div", {
										className: "sm:w-3/5 p-6 flex flex-col justify-center",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2 mb-3",
												children: [/* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-[#E6B800]" }), /* @__PURE__ */ jsx("span", {
													className: "text-gray-500 text-sm",
													children: item.date
												})]
											}),
											/* @__PURE__ */ jsx("h3", {
												className: "font-serif text-xl font-bold text-gray-900 mb-2 group-hover:text-[#E6B800] transition-colors",
												children: item.title
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-gray-600 text-sm mb-4 line-clamp-2",
												children: item.description
											}),
											/* @__PURE__ */ jsxs("a", {
												href: item.link,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "inline-flex items-center gap-2 text-[#E6B800] font-medium text-sm hover:gap-3 transition-all",
												children: ["Ver más", /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })]
											})
										]
									})]
								})
							}, item.title))
						})]
					})
				]
			})
		]
	});
};
//#endregion
//#region src/sections/Instagram.tsx
var InstagramIcon$2 = ({ className }) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ jsx("rect", {
			width: "20",
			height: "20",
			x: "2",
			y: "2",
			rx: "5",
			ry: "5"
		}),
		/* @__PURE__ */ jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
		/* @__PURE__ */ jsx("line", {
			x1: "17.5",
			x2: "17.51",
			y1: "6.5",
			y2: "6.5"
		})
	]
});
var Instagram = () => {
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef(null);
	const hydrated = useHydrated();
	const anim = (vis, base = "", delay = "") => hydrated ? `${base} transition-all duration-700 ${delay} ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`.trim() : base;
	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
				observer.disconnect();
			}
		}, { threshold: .1 });
		if (sectionRef.current) observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ jsxs("section", {
		ref: sectionRef,
		className: "section-padding bg-gradient-to-b from-gray-50 to-white relative overflow-hidden",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#E6B800]/10 to-[#E6B800]/5 rounded-full blur-2xl" }),
			/* @__PURE__ */ jsx("div", { className: "absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-[#E6B800]/10 to-[#E6B800]/5 rounded-full blur-2xl" }),
			/* @__PURE__ */ jsxs("div", {
				className: "container-custom mx-auto relative z-10",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: anim(isVisible, "text-center mb-12"),
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-2 bg-gradient-to-r from-[#833ab4]/10 via-[#fd1d1d]/10 to-[#f77737]/10 rounded-full px-4 py-2 mb-6",
								children: [/* @__PURE__ */ jsx(InstagramIcon$2, { className: "w-5 h-5 text-[#E6B800]" }), /* @__PURE__ */ jsx("span", {
									className: "text-gray-700 text-sm font-medium",
									children: "@maiz_tostao_restaurante"
								})]
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4",
								children: "Síguenos en Instagram"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "max-w-2xl mx-auto text-gray-600 text-lg",
								children: "Descubre nuestros platos, eventos especiales y momentos detrás de cámaras. ¡Únete a nuestra comunidad gastronómica!"
							}),
							/* @__PURE__ */ jsx("div", { className: "w-24 h-1 gold-gradient mx-auto rounded-full mt-6" })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: anim(isVisible, "text-center mb-12", "delay-200"),
						children: [/* @__PURE__ */ jsxs("a", {
							href: "https://www.instagram.com/maiz_tostao_restaurante/",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex items-center gap-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#f77737] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
							children: [
								/* @__PURE__ */ jsx(InstagramIcon$2, { className: "w-6 h-6" }),
								"Visitar Perfil de Instagram",
								/* @__PURE__ */ jsx(ExternalLink, { className: "w-5 h-5" })
							]
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-gray-500 text-sm mt-4",
							children: [
								"Etiquétanos en tus fotos con ",
								/* @__PURE__ */ jsx("span", {
									className: "text-[#E6B800] font-medium",
									children: "#MaizTostao"
								}),
								" para aparecer en nuestra galería"
							]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12",
						children: [
							{
								image: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777001191/SaveClip.App_641241086_17856526131616497_21585724097976483_n_vidbhu.jpg",
								likes: null,
								comments: null,
								link: "https://www.instagram.com/p/DVEZ8AACZ1J/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
							},
							{
								image: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777001253/SaveClip.App_629264123_18064688300644100_1353939720271493304_n_gmjsuo.jpg",
								likes: null,
								comments: null,
								link: "https://www.instagram.com/p/DUts_j5ERch/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
							},
							{
								image: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777001434/SaveClip.App_541556304_18046621523644100_8773017557661155932_n_vudura.jpg",
								likes: null,
								comments: null,
								link: "https://www.instagram.com/reel/DORISJ8kSVh/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
							},
							{
								image: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777001630/SaveClip.App_539440410_18045644945644100_9010201564138883741_n_isyoit.jpg",
								likes: null,
								comments: null,
								link: "https://www.instagram.com/p/DN58nD3kQZF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
							},
							{
								image: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777001775/SaveClip.App_524651681_765827495811133_7384363894445476023_n_rdeqfs.jpg",
								likes: null,
								comments: null,
								link: "https://www.instagram.com/maiz_tostao_restaurante/reel/DMszVT_sQEV/"
							},
							{
								image: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777001966/SaveClip.App_523394222_18041578520644100_2615361667120338567_n-1_ou5nwj.webp",
								likes: null,
								comments: null,
								link: "https://www.instagram.com/maiz_tostao_restaurante/p/DMbvyZKMdou/"
							}
						].map((post, index) => /* @__PURE__ */ jsxs("a", {
							href: post.link,
							target: "_blank",
							rel: "noopener noreferrer",
							className: hydrated ? `group relative aspect-square rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}` : "group relative aspect-square rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
							style: { transitionDelay: `${index * 100 + 300}ms` },
							children: [/* @__PURE__ */ jsx("img", {
								src: post.image,
								alt: `Instagram post ${index + 1}`,
								className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							}), /* @__PURE__ */ jsx("div", {
								className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4 text-white",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ jsx(Heart, { className: "w-5 h-5 fill-white" }), /* @__PURE__ */ jsx("span", {
											className: "text-sm font-medium",
											children: post.likes
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5 fill-white" }), /* @__PURE__ */ jsx("span", {
											className: "text-sm font-medium",
											children: post.comments
										})]
									})]
								})
							})]
						}, index))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: anim(isVisible, "flex flex-wrap justify-center gap-8", "delay-700"),
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "text-center",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-serif text-3xl font-bold text-[#E6B800]",
									children: "1.8K+"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-gray-500 text-sm",
									children: "Seguidores"
								})]
							}),
							/* @__PURE__ */ jsx("div", { className: "w-px h-12 bg-gray-200 hidden sm:block" }),
							/* @__PURE__ */ jsxs("div", {
								className: "text-center",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-serif text-3xl font-bold text-[#E6B800]",
									children: "70+"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-gray-500 text-sm",
									children: "Publicaciones"
								})]
							}),
							/* @__PURE__ */ jsx("div", { className: "w-px h-12 bg-gray-200 hidden sm:block" }),
							/* @__PURE__ */ jsxs("div", {
								className: "text-center",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-serif text-3xl font-bold text-[#E6B800]",
									children: "4.7"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-gray-500 text-sm",
									children: "Valoración"
								})]
							})
						]
					})
				]
			})
		]
	});
};
//#endregion
//#region src/sections/Contact.tsx
var InstagramIcon$1 = ({ className }) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ jsx("rect", {
			width: "20",
			height: "20",
			x: "2",
			y: "2",
			rx: "5",
			ry: "5"
		}),
		/* @__PURE__ */ jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
		/* @__PURE__ */ jsx("line", {
			x1: "17.5",
			x2: "17.51",
			y1: "6.5",
			y2: "6.5"
		})
	]
});
var FacebookIcon$1 = ({ className }) => /* @__PURE__ */ jsx("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: /* @__PURE__ */ jsx("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" })
});
var Contact = () => {
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef(null);
	const hydrated = useHydrated();
	const anim = (vis, base = "", delay = "") => hydrated ? `${base} transition-all duration-700 ${delay} ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`.trim() : base;
	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
				observer.disconnect();
			}
		}, { threshold: .1 });
		if (sectionRef.current) observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);
	const contactInfo = [
		{
			icon: MapPin,
			title: "Dirección",
			content: "Km 1 via sangil - pinchote , Pinchote, Santander, Colombia",
			link: "https://maps.google.com/?q=Pinchote,Santander,Colombia"
		},
		{
			icon: Phone,
			title: "Teléfono",
			content: "+57 312 752 8524",
			link: "https://wa.me/573127528524"
		},
		{
			icon: Clock,
			title: "Horario",
			content: "Lun - Dom: 11:30 AM - 8:00 PM",
			link: null
		}
	];
	const socialLinks = [{
		icon: InstagramIcon$1,
		href: "https://www.instagram.com/maiz_tostao_restaurante/",
		label: "Instagram"
	}, {
		icon: FacebookIcon$1,
		href: "https://www.facebook.com/maiztostaorestaurante/",
		label: "Facebook"
	}];
	return /* @__PURE__ */ jsxs("section", {
		id: "contacto",
		ref: sectionRef,
		className: "section-padding bg-white relative overflow-hidden",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-[#E6B800]/5 rounded-full -translate-y-1/2 translate-x-1/2" }),
			/* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-[#E6B800]/5 rounded-full translate-y-1/2 -translate-x-1/2" }),
			/* @__PURE__ */ jsxs("div", {
				className: "container-custom mx-auto relative z-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: anim(isVisible, "text-center mb-16"),
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "inline-block text-[#E6B800] text-sm font-semibold uppercase tracking-widest mb-4",
							children: "Contáctanos"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6",
							children: "Visítanos o Escríbenos"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "max-w-2xl mx-auto text-gray-600 text-lg",
							children: "Estamos aquí para hacer de tu experiencia algo inolvidable. Reserva tu mesa o escríbenos para cualquier consulta."
						}),
						/* @__PURE__ */ jsx("div", { className: "w-24 h-1 gold-gradient mx-auto rounded-full mt-6" })
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "max-w-3xl mx-auto",
					children: /* @__PURE__ */ jsxs("div", {
						className: anim(isVisible, "space-y-8", "delay-200"),
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: contactInfo.map((item) => /* @__PURE__ */ jsx("div", {
									className: "group bg-gray-50 rounded-xl p-5 hover:bg-white hover:shadow-lg transition-all duration-300",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform",
											children: /* @__PURE__ */ jsx(item.icon, { className: "w-5 h-5 text-white" })
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
											className: "font-semibold text-gray-900 mb-1",
											children: item.title
										}), item.link ? /* @__PURE__ */ jsx("a", {
											href: item.link,
											target: item.link.startsWith("http") ? "_blank" : void 0,
											rel: item.link.startsWith("http") ? "noopener noreferrer" : void 0,
											className: "text-gray-600 text-sm hover:text-[#E6B800] transition-colors",
											children: item.content
										}) : /* @__PURE__ */ jsx("p", {
											className: "text-gray-600 text-sm",
											children: item.content
										})] })]
									})
								}, item.title))
							}),
							/* @__PURE__ */ jsx("div", {
								className: "rounded-2xl overflow-hidden shadow-lg",
								children: /* @__PURE__ */ jsx("iframe", {
									src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4056.749480567199!2d-73.16960822490189!3d6.541019593451819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e69c1003b2e7845%3A0xd51aee88fae6a347!2sMaiz%20Tostado!5e1!3m2!1ses-419!2sco!4v1776997784523!5m2!1ses-419!2sco",
									width: "100%",
									height: "350",
									style: { border: 0 },
									allowFullScreen: true,
									loading: "lazy",
									referrerPolicy: "no-referrer-when-downgrade",
									title: "Ubicación de Maiz Tostao Restaurante",
									className: "grayscale-[20%] hover:grayscale-0 transition-all duration-500"
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-center gap-4",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-gray-600 text-sm",
									children: "Síguenos:"
								}), socialLinks.map((social) => /* @__PURE__ */ jsx("a", {
									href: social.href,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "w-10 h-10 rounded-full bg-gray-100 hover:bg-[#E6B800] text-gray-600 hover:text-white flex items-center justify-center transition-all duration-300",
									"aria-label": social.label,
									children: /* @__PURE__ */ jsx(social.icon, { className: "w-5 h-5" })
								}, social.label))]
							})
						]
					})
				})]
			})
		]
	});
};
//#endregion
//#region src/sections/Footer.tsx
var InstagramIcon = ({ className }) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ jsx("rect", {
			width: "20",
			height: "20",
			x: "2",
			y: "2",
			rx: "5",
			ry: "5"
		}),
		/* @__PURE__ */ jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
		/* @__PURE__ */ jsx("line", {
			x1: "17.5",
			x2: "17.51",
			y1: "6.5",
			y2: "6.5"
		})
	]
});
var FacebookIcon = ({ className }) => /* @__PURE__ */ jsx("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: /* @__PURE__ */ jsx("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" })
});
var Footer = () => {
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	const quickLinks = [
		{
			name: "Inicio",
			href: "#inicio"
		},
		{
			name: "Nosotros",
			href: "#nosotros"
		},
		{
			name: "Menú",
			href: "#menu"
		},
		{
			name: "Noticias",
			href: "#noticias"
		},
		{
			name: "Contacto",
			href: "#contacto"
		}
	];
	const scrollToSection = (href) => {
		const element = document.querySelector(href);
		if (element) element.scrollIntoView({ behavior: "smooth" });
	};
	return /* @__PURE__ */ jsxs("footer", {
		className: "bg-gray-900 text-white relative overflow-hidden",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E6B800]/50 to-transparent" }),
			/* @__PURE__ */ jsx("div", { className: "absolute top-20 right-20 w-40 h-40 bg-[#E6B800]/5 rounded-full blur-3xl" }),
			/* @__PURE__ */ jsx("div", { className: "absolute bottom-20 left-20 w-60 h-60 bg-[#E6B800]/5 rounded-full blur-3xl" }),
			/* @__PURE__ */ jsxs("div", {
				className: "container-custom mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "lg:col-span-1",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 mb-6",
									children: [/* @__PURE__ */ jsx("img", {
										src: "https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004528/logo_y57zko.png",
										alt: "Maiz Tostao Logo",
										className: "w-14 h-14 object-contain"
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "font-serif font-bold text-xl block",
										children: "Maiz Tostao"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-white/60 text-xs uppercase tracking-wider",
										children: "Restaurante"
									})] })]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-white/70 text-sm leading-relaxed mb-6",
									children: "Cocina de autor que fusiona los sabores tradicionales santandereanos y peruanos. Cada plato es una experiencia inolvidable."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx("a", {
										href: "https://www.instagram.com/maiz_tostao_restaurante/",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "w-10 h-10 rounded-full bg-white/10 hover:bg-[#E6B800] flex items-center justify-center transition-all duration-300",
										"aria-label": "Instagram",
										children: /* @__PURE__ */ jsx(InstagramIcon, { className: "w-5 h-5" })
									}), /* @__PURE__ */ jsx("a", {
										href: "https://www.facebook.com/maiztostaorestaurante/",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "w-10 h-10 rounded-full bg-white/10 hover:bg-[#E6B800] flex items-center justify-center transition-all duration-300",
										"aria-label": "Facebook",
										children: /* @__PURE__ */ jsx(FacebookIcon, { className: "w-5 h-5" })
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
							className: "font-serif text-lg font-bold mb-6",
							children: "Enlaces Rápidos"
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-3",
							children: quickLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
								href: link.href,
								onClick: (e) => {
									e.preventDefault();
									scrollToSection(link.href);
								},
								className: "text-white/70 hover:text-[#E6B800] transition-colors text-sm",
								children: link.name
							}) }, link.name))
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
							className: "font-serif text-lg font-bold mb-6",
							children: "Contacto"
						}), /* @__PURE__ */ jsxs("ul", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-[#E6B800] flex-shrink-0 mt-0.5" }), /* @__PURE__ */ jsx("span", {
										className: "text-white/70 text-sm",
										children: "Km 1 via San Gil - Pinchote, Pinchote, Santander, Colombia"
									})]
								}),
								/* @__PURE__ */ jsxs("li", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-[#E6B800] flex-shrink-0" }), /* @__PURE__ */ jsx("a", {
										href: "https://wa.me/573127528524",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "text-white/70 hover:text-[#E6B800] transition-colors text-sm",
										children: "+57 312 752 8524"
									})]
								}),
								/* @__PURE__ */ jsxs("li", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-[#E6B800] flex-shrink-0" }), /* @__PURE__ */ jsx("span", {
										className: "text-white/70 text-sm",
										children: "Lun - Dom: 11:30 AM - 8:00 PM"
									})]
								})
							]
						})] })
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-16 pt-8 border-t border-white/10",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col md:flex-row items-center justify-between gap-4",
						children: [/* @__PURE__ */ jsxs("p", {
							className: "text-white/50 text-sm text-center md:text-left",
							children: [
								"© ",
								currentYear,
								" Maiz Tostao Restaurante. Todos los derechos reservados."
							]
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-white/50 text-sm flex items-center gap-1",
							children: [
								"Hecho con ",
								/* @__PURE__ */ jsx(Heart, { className: "w-4 h-4 text-[#E6B800] fill-[#E6B800]" }),
								" en Pinchote, Santander"
							]
						})]
					})
				})]
			})
		]
	});
};
//#endregion
//#region src/components/ScrollToTop.tsx
var ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 500) setIsVisible(true);
			else setIsVisible(false);
		};
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ jsx("button", {
		onClick: scrollToTop,
		className: `fixed bottom-8 right-8 z-50 p-3 bg-[#E6B800] text-white rounded-full shadow-lg transition-all duration-300 hover:bg-[#D4A000] hover:shadow-xl hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`,
		"aria-label": "Volver arriba",
		children: /* @__PURE__ */ jsx(ChevronUp, { className: "w-6 h-6" })
	});
};
//#endregion
//#region src/components/WhatsAppWidget.tsx
var WhatsAppWidget = () => {
	const [isOpen, setIsOpen] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3",
		children: [isOpen && /* @__PURE__ */ jsxs("div", {
			className: "bg-white rounded-2xl shadow-2xl w-80 overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", {
				className: "bg-[#25D366] px-4 py-5",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "text-white font-bold text-base leading-tight",
						children: "Comenzar una conversación"
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-white/80 text-sm mt-1",
						children: [
							"¡Hola! Haz clic en el botón de abajo para chatear por",
							" ",
							/* @__PURE__ */ jsx("strong", {
								className: "text-white",
								children: "WhatsApp"
							})
						]
					})] }), /* @__PURE__ */ jsx("button", {
						onClick: () => setIsOpen(false),
						className: "text-white/80 hover:text-white transition-colors ml-2 mt-0.5 flex-shrink-0",
						children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
					})]
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "bg-gray-50 px-4 py-3",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-400 text-xs mb-3",
						children: "El equipo suele responder en unos minutos."
					}),
					/* @__PURE__ */ jsxs("a", {
						href: `https://wa.me/573127528524?text=${encodeURIComponent("¡Hola Maíz Tostao! 🌽 Quisiera obtener más información.")}`,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0",
								children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-6 h-6 text-white" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-semibold text-gray-800 text-sm",
									children: "Maíz Tostao"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-gray-400 text-xs",
									children: "Restaurante"
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0",
								children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-4 h-4 text-white" })
							})
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-center text-gray-300 text-xs mt-3",
						children: "powered by WhatsApp"
					})
				]
			})]
		}), /* @__PURE__ */ jsx("button", {
			onClick: () => setIsOpen(!isOpen),
			className: "w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95",
			style: { background: "linear-gradient(135deg, #25D366, #128C7E)" },
			"aria-label": "Abrir chat de WhatsApp",
			children: isOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6 text-white" }) : /* @__PURE__ */ jsx(MessageCircle, { className: "w-7 h-7 text-white" })
		})]
	});
};
//#endregion
//#region src/App.tsx
function App() {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-white",
		children: [
			/* @__PURE__ */ jsx(Header, {}),
			/* @__PURE__ */ jsxs("main", { children: [
				/* @__PURE__ */ jsx(Hero, {}),
				/* @__PURE__ */ jsx(About, {}),
				/* @__PURE__ */ jsx(FeaturedDishes, {}),
				/* @__PURE__ */ jsx(News, {}),
				/* @__PURE__ */ jsx(Instagram, {}),
				/* @__PURE__ */ jsx(Contact, {})
			] }),
			/* @__PURE__ */ jsx(Footer, {}),
			/* @__PURE__ */ jsx(ScrollToTop, {}),
			/* @__PURE__ */ jsx(WhatsAppWidget, {})
		]
	});
}
//#endregion
//#region src/entry-server.tsx
function render() {
	return renderToString(/* @__PURE__ */ jsx(App, {}));
}
//#endregion
export { render };
