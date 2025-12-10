import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Adicionar lógica de middleware aqui se necessário
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permitir acesso se o usuário estiver autenticado
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/aulas/:path*",
    "/assinatura/:path*", 
    "/configuracoes/:path*",
    "/admin/:path*"
  ]
}