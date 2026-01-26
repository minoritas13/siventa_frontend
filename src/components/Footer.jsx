import React from "react";
import { FaInstagram, FaGlobe, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-[#C4161C] text-white py-8 px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-start gap-10">
            
            {/* Kolom 1: Logo (Rata Kiri) */}
            <div className="flex justify-start">
            <div className="bg-white p-2 rounded-sm shadow-sm">
                <img 
                src="/logo-antara.png" 
                alt="Antara Logo" 
                className="w-32 h-auto object-contain" 
                />
            </div>
            </div>

            {/* Kolom 2: Alamat & Media Sosial Utama (Tengah) */}
            <div className="flex flex-col space-y-4 text-[13px] leading-relaxed">
            <p className="max-w-xs">
                Jl. Abdi Negara No 2, Gulak Galik, <br />
                Kec. Tlk. Betung Utara, Kota Bandar Lampung, Lampung 35214
            </p>
            
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                <FaGlobe className="text-base" />
                <a href="https://lampung.antaranews.com" target="_blank" rel="noreferrer" className="hover:underline">
                    https://lampung.antaranews.com
                </a>
                </div>
                <div className="flex items-center gap-3">
                <FaInstagram className="text-base" />
                <span>antarabirolampung</span>
                </div>
            </div>
            </div>

            {/* Kolom 3: Kontak & Social Media (Rata Kanan) */}
            <div className="flex flex-col space-y-2 text-[13px] md:items-end">
            <div className="flex items-center gap-3">
                <FaPhoneAlt />
                <span>0721 482001</span>
            </div>
            <div className="flex items-center gap-3">
                <FaEnvelope />
                <span>antaralampung@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
                <FaFacebook />
                <span>antaralampung</span>
            </div>
            <div className="flex items-center gap-3">
                <FaXTwitter />
                <span>antaralampung</span>
            </div>
            </div>

        </div>
        </footer>
    );
};

export default Footer;
