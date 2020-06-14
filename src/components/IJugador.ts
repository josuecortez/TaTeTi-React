export interface IJugador{
    id: number,
    nameUser: string,
    ganador: boolean,
    visible: boolean,
    visibleHome: (event: React.MouseEvent<HTMLButtonElement>) => void;
}