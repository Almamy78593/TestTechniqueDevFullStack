<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TeacherRepository")
 */
class Teachr
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;
    private $prenom;
    private $dateOfCreation;

    public function __construct(int $id,  String $prenom)
    {
        if(sizeof($prenom)>255) {
            trigger_error('La taille du prénom ne peut dépasser 255 caractères', E_USER_WARNING);
            return; 
        }
        $this->id=$id;
        $this->prenom = $prenom;
        $this->dateOfCreation = getdate('Y-m-d');

    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrenom(){
        return $this->prenom;
    }

    public function getDateOfCreation()
    {
        return $this->dateOfCreation;
    }
}
