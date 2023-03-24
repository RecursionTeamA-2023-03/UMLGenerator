-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "username" VARCHAR,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersOnProjects" (
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" VARCHAR NOT NULL,

    CONSTRAINT "usersOnProjects_pkey" PRIMARY KEY ("userId","projectId")
);

-- CreateTable
CREATE TABLE "diagram" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diagram_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "usersOnProjects" ADD CONSTRAINT "usersOnProjects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersOnProjects" ADD CONSTRAINT "usersOnProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagram" ADD CONSTRAINT "diagram_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
