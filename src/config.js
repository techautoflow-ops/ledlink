/**
 * Configuração central do LedLink.
 *
 * Este é o único arquivo que precisa ser editado para publicar.
 * Nenhum segredo deve ser colocado aqui: tudo neste arquivo fica público.
 */

export const CONFIG = {
  /** Nome exibido no site */
  siteName: "LedLink",

  /**
   * WhatsApp oficial (pendência D5 do SPEC).
   * Formato: apenas números, com código do país. Ex.: "5511999999999".
   * Enquanto estiver vazio, os botões de contato ficam desativados com aviso.
   */
  whatsappNumber: "",

  /**
   * E-mail oficial de contato (pendência D5 do SPEC).
   * Enquanto estiver vazio, o botão de cadastro mostra um aviso.
   */
  contactEmail: "",

  /** Endereço público do site (usado em links absolutos e SEO) */
  baseUrl: "https://techautoflow-ops.github.io/ledlink/",

  /**
   * Fase 1a: o site roda com dados de exemplo e não salva nada.
   * Mude para false quando o backend (Fase 1b) estiver conectado.
   */
  demoMode: true,
};
