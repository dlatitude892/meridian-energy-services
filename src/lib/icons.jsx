import {
  Anchor, Ship, Compass, FileCheck, ShieldCheck, AlertTriangle,
  Users, Newspaper, MapPin, Lock, Plus, Trash2, Pencil, LogOut,
  ChevronRight, ChevronLeft, X, Save, Menu, ArrowRight, Container, Ruler, Fuel,
  ClipboardList, HardHat, Waves, Factory, Flame, Image as ImageIcon,
  Briefcase, Wrench, Drill, Truck, Boxes, Building2, Globe2, Radar,
  Gauge, Cog, Cpu, Layers, Package, ShieldAlert, Leaf, Award,
  Calendar, Clock, Phone, Mail, Send, Filter, Search, ExternalLink,
  ChevronDown, Check, CircleAlert, UploadCloud, Download, Eye, EyeOff,
  BadgeCheck, Building, Warehouse, Ship as ShipIcon, Zap, Activity,
  ClipboardCheck, FileText, Star, TrendingUp, Handshake, GraduationCap,
} from "lucide-react";

export const ICONS = {
  Anchor, Ship, Compass, FileCheck, ShieldCheck, AlertTriangle,
  Users, Newspaper, MapPin, Lock, Plus, Trash2, Pencil, LogOut,
  ChevronRight, ChevronLeft, X, Save, Menu, ArrowRight, Container, Ruler, Fuel,
  ClipboardList, HardHat, Waves, Factory, Flame, ImageIcon,
  Briefcase, Wrench, Drill, Truck, Boxes, Building2, Globe2, Radar,
  Gauge, Cog, Cpu, Layers, Package, ShieldAlert, Leaf, Award,
  Calendar, Clock, Phone, Mail, Send, Filter, Search, ExternalLink,
  ChevronDown, Check, CircleAlert, UploadCloud, Download, Eye, EyeOff,
  BadgeCheck, Building, Warehouse, Zap, Activity,
  ClipboardCheck, FileText, Star, TrendingUp, Handshake, GraduationCap,
};

export const ICON_NAMES = Object.keys(ICONS);

export function Icon({ name, ...props }) {
  const Cmp = ICONS[name] || Cog;
  return <Cmp {...props} />;
}
