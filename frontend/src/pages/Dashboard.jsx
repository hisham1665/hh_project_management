import React from "react";

/**
 * TaskMaster Dashboard React Component
 * TailwindCSS required
 */
const projects = [
  {
    title: "Project Alpha",
    description:
      "Developing a new marketing strategy for the upcoming product launch.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9_uzLu_io0lx84u0IddzCwzaFSkXGePIaazIgC6CJ0PIHVLup81gnEaEi1biwSw6QTBxoXc-W5xjNs_JjaPKx5gy66WlCUHnGD__183-BMz6WZVUPH7ecP2UYaXNnAeNV-XMaIviATNiTs3vnwNKanisaQ8P1YH12N_QmSINeCaY7vINSAXV96bxoekuv5eWdLKEztEhfekW6WSvji6YvRjCmdk3EvElZHWFu8XuwXji_lIShvFiOYoiu--7VhZ8Cw0YbFFnqXoE",
  },
  {
    title: "Project Beta",
    description:
      "Enhancing the user interface of the mobile application for better user experience.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLIyBnuc87GX94S7GOKpPAJxLBWcEiySA0O2rZQ6fpFeeYcflztYXzMaGSc97DP7J_pHmnKUYp_jCBhUr0S185EA0ZaRlWP6QhL-6vNb3fqHR5WHZGkBZoBvlYu8HqKf4S59fyY-PH_BH0tA9h6Bq87W2v3lgzPqXaMyMzN4GOnFFZNXWqcnoCXj-E86bJT_WghpdlSScBZ8nyNLMPg1kiWLtaHb7z98gbiZwkGBrZBUQ8tVIvVI8GS4lTorL9KZok7jYndVY8Iig",
  },
  {
    title: "Project Gamma",
    description:
      "Conducting market research to identify new opportunities and trends.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKWRXZi_q2WjzNWj5wDEMpddYrNvotbnNvuzsom2rtKPOgB0qGs9--4PUwDAuxloTbzDaWntXFMj_q8NBV8q-5eFNyFmzR-G1huUsfzVvnVpIktW78IXvSjbmDBgXyVeGiVKuZxAsm7ObKTFK2pIrlSPrTQ34fAZxWxpUqeV4dVqqcnF-e9i0isq_zD2BCmHIQR1NJ7eHtIX8Q_Okm3-2IFSkfXguReVD8lHr1HDfNcLBotahlEb6mdaS6SGZRiuutkBIzGJOUBgA",
  },
];

export default function Dashboard() {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
      style={{
        fontFamily: 'Inter, "Noto Sans", sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#0d141c]">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em]">
              HH Project Manager
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAQgbw5NaJ4JIoUAyIj4Iqn0djbKihLUtr6aNhuFZ_GV8_dpEu4WMTRVHfE_Jmm7yOx7E4dljvUOpSn6y_5S8UuOAWXaLZyNQkD_Tw3X_7Jzz7iOsxPt_PGZwU2FDTKiXQy6Kyj1y8J9I8NUf5IDwa1jfrhpy8_HgiEqb3aD4F8wwuUGhbfnLJ4lWTR3R1fF2BnbBnsx8I4QDXb_zv-08vn55fdFwoI17qc-QPl0zYt4_q_3ZTMLBAMlXpbuv_zaB41WOsAWM-m7s")',
              }}
            ></div>
          </div>
        </header>
        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Projects Title and Add Button */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#0d141c] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Projects
              </p>
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#e7edf4] text-[#0d141c] text-sm font-medium leading-normal"
              >
                <span className="truncate">Add New Project</span>
              </button>
            </div>
            {/* Project Cards */}
            {projects.map((proj, i) => (
              <div className="p-4" key={i}>
                <div className="flex items-stretch justify-between gap-4 rounded-lg">
                  <div className="flex flex-col gap-1 flex-[2_2_0px]">
                    <p className="text-[#0d141c] text-base font-bold leading-tight">
                      {proj.title}
                    </p>
                    <p className="text-[#49739c] text-sm font-normal leading-normal">
                      {proj.description}
                    </p>
                  </div>
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                    style={{
                      backgroundImage: `url("${proj.image}")`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}